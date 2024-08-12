'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      // Kullanıcı adını URL parametresi olarak gönderiyoruz
      router.replace(`/game?username=${encodeURIComponent(username)}`);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Welcome Back!</h1>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='mb-4 p-2 border border-white rounded-3xl text-white bg-transparent'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='mb-4 p-2 border border-white rounded-3xl text-white bg-transparent'
      />
      {error && (
        <p className='bg-transparent border-2 text-red-500 border-red-500 rounded-3xl w-full py-1 mb-4 text-center text-base'>
          {error}
        </p>
      )}
      <button
        onClick={handleLogin}
        className='bg-white text-black py-2 px-8 rounded-3xl w-full hover:bg-red-600 hover:text-white transition-all duration-200'
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
