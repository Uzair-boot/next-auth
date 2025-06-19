'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const register = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 px-4">
      <div className="backdrop-blur-md bg-white/30 shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">
          Register
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-sm"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-sm"
          />
          <button
            onClick={register}
            className="w-full py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-100 transition duration-200"
          >
            Register
          </button>

          <p className="text-center text-sm text-white mt-4">
            Already have an account?
            <Link href="/login" className="underline font-semibold hover:text-purple-100">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
