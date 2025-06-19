// 'use client';
// import { useState } from 'react';

// export default function PostForm({ onPostCreated }: { onPostCreated: () => void }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async () => {
//     if (!title || !content) return;
//     await fetch('/api/posts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, content }),
//     });
//     setTitle('');
//     setContent('');
//     setIsOpen(false);
//     onPostCreated();
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-100 transition duration-200 mb-4"
//       >
//         + New Post
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
//             <h2 className="text-xl font-bold text-purple-700">Create New Post</h2>
//             <input
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               placeholder="Title"
//               className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             <textarea
//               value={content}
//               onChange={e => setContent(e.target.value)}
//               placeholder="Content"
//               rows={4}
//               className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
//               >
//                 Post
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



'use client';
import { useState } from 'react';

export default function PostForm({
  onPostSaved,
  existingPost = null,
}: {
  onPostSaved: () => void;
  existingPost?: { _id: string; title: string; content: string } | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content) return;
    setLoading(true);

    const method = existingPost ? 'PUT' : 'POST';
    const url = existingPost ? `/api/posts/${existingPost._id}` : '/api/posts';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    setLoading(false);
    setTitle('');
    setContent('');
    setIsOpen(false);
    onPostSaved();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-100 transition duration-200 mb-4"
      >
        {existingPost ? 'Edit Post' : '+ New Post'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-purple-700">
              {existingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Content"
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
