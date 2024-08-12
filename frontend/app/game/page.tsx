'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ChessboardComponent from '@/components/Chessboard';
import RoomSelection from '@/components/RoomSelection';
import { useRouter } from 'next/navigation';

const GamePage = () => {
  const router = useRouter();

  const [roomID, setRoomID] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const username = searchParams.get('username'); // URL'den kullanıcı adını alıyoruz

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    router.replace('/login'); // Eğer oturum açılmamışsa hiçbir şey gösterme
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-xl font-bold mb-10'>Welcome, {username}!</h2>{' '}
      {/* Kullanıcı adını gösteriyoruz */}
      {!roomID ? (
        <RoomSelection onJoinRoom={setRoomID} />
      ) : (
        <ChessboardComponent roomID={roomID} />
      )}
    </div>
  );
};

export default GamePage;
