'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      router.push('/game');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
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
