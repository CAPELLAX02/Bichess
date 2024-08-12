'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChessboardComponent from '@/components/Chessboard';
import RoomSelection from '@/components/RoomSelection';

const GamePage = () => {
  const [roomID, setRoomID] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Giriş yapılmamışsa login sayfasına yönlendir
    }
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {!roomID ? (
        <RoomSelection onJoinRoom={setRoomID} />
      ) : (
        <ChessboardComponent roomID={roomID} />
      )}
    </div>
  );
};

export default GamePage;
