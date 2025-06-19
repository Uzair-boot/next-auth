// 'use client';
// import { useEffect, useState } from 'react';
// import { signOut } from 'next-auth/react';

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const fetchPosts = async () => {
//     const res = await fetch('/api/posts');
//     const data = await res.json();
//     setPosts(data);
//   };

//   const createPost = async () => {
//     if (!title || !content) return;
//     await fetch('/api/posts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, content }),
//     });
//     setTitle('');
//     setContent('');
//     fetchPosts();
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 p-6 sm:p-10">
//       <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-white drop-shadow">Posts Dashboard</h1>
//           <button
//             onClick={() => signOut()}
//             className="bg-white text-pink-600 font-semibold px-4 py-2 rounded-lg hover:bg-pink-100 transition duration-200"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="space-y-4 mb-8">
//           <input
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             placeholder="Title"
//             className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
//           />
//           <textarea
//             value={content}
//             onChange={e => setContent(e.target.value)}
//             placeholder="Content"
//             rows={4}
//             className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
//           />
//           <button
//             onClick={createPost}
//             className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-100 transition duration-200"
//           >
//             Create Post
//           </button>
//         </div>

//         <ul className="space-y-4">
//           {posts.map((p: any) => (
//             <li key={p._id} className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow">
//               <h2 className="text-lg font-semibold text-purple-800">{p.title}</h2>
//               <p className="text-gray-700">{p.content}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useState } from 'react';
// import { signOut } from 'next-auth/react';
// import dynamic from 'next/dynamic';

// const PostForm = dynamic(() => import('@/components/PostForm'), { ssr: false });
// import PostList from '@/components/PostList'; // Server Component

// export default function Home() {
//   const [refresh, setRefresh] = useState(false);

//   const handlePostCreated = () => {
//     setRefresh(!refresh); // trigger rerender or logic to refresh PostList via key
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 p-6 sm:p-10">
//       <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-white drop-shadow">Posts Dashboard</h1>
//           <button
//             onClick={() => signOut()}
//             className="bg-white text-pink-600 font-semibold px-4 py-2 rounded-lg hover:bg-pink-100 transition duration-200"
//           >
//             Logout
//           </button>
//         </div>

//         <PostForm onPostCreated={handlePostCreated} />

//         {/* Force refresh with key (hacky but simple) */}
//         <div key={refresh ? 'a' : 'b'}>
//           <PostList />
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';
import { signOut } from 'next-auth/react';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white drop-shadow">Posts Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="bg-white text-pink-600 font-semibold px-4 py-2 rounded-lg hover:bg-pink-100 transition duration-200"
          >
            Logout
          </button>
        </div>

        <PostForm onPostSaved={() => {}} />
        <PostList />
      </div>
    </div>
  );
}
