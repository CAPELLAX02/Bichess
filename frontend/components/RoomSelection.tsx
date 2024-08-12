'use client';

import { useState } from 'react';

const RoomSelection = ({
  onJoinRoom,
}: {
  onJoinRoom: (roomID: string) => void;
}) => {
  const [roomID, setRoomID] = useState('');

  const handleJoinRoom = () => {
    onJoinRoom(roomID);
  };

  return (
    <div className='flex flex-col items-center gap-3'>
      {' '}
      {/* Flexbox ile dikey hizalama ve boşluk ekleme */}
      <input
        type='text'
        placeholder='Enter Room ID'
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
        className='mb-2 p-2 ps-4 border-2 border-gray-200 rounded-3xl bg-transparent placeholder-gray-200 text-white font-semibold focus:scale-110 transition-all duration-100'
      />
      <button
        onClick={handleJoinRoom}
        className='font-semibold hover:font-semibold hover:bg-transparent hover:text-black border-2 border-green-600 hover:border-white bg-green-600 text-white text-lg hover:bg-white transition-all duration-200 py-1 px-10 rounded-3xl hover:scale-105'
      >
        Join Room
      </button>
    </div>
  );
};

export default RoomSelection;
