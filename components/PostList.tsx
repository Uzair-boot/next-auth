// import { connectDB } from '../lib/mongodb';
// import Post from '@/models/Post';
// import mongoose from 'mongoose';

// export default async function PostList() {
//   await connectDB();
//   const posts = await Post.find().sort({ createdAt: -1 });

//   return (
//     <ul className="space-y-4 mt-4">
//       {posts.map((p: any) => (
//         <li key={p._id.toString()} className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold text-purple-800">{p.title}</h2>
//           <p className="text-gray-700">{p.content}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }



'use client';
import { useEffect, useState } from 'react';
import PostForm from './PostForm';

export default function PostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    const optimistic = posts.filter(p => p._id !== id);
    setPosts(optimistic); // optimistic update
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts(); // revalidate
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="text-white text-center">Loading posts...</div>;

  return (
    <div>
      {editPost && (
        <PostForm existingPost={editPost} onPostSaved={() => {
          setEditPost(null);
          fetchPosts();
        }} />
      )}

      <ul className="space-y-4 mt-4">
        {posts.map((p: any) => (
          <li
            key={p._id}
            className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow flex justify-between items-start"
          >
            <div>
              <h2 className="text-lg font-semibold text-purple-800">{p.title}</h2>
              <p className="text-gray-700">{p.content}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditPost(p)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(p._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
