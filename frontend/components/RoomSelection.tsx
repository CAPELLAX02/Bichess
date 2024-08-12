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
    <div>
      <input
        type='text'
        placeholder='Enter Room ID'
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
        className='mb-2 p-2 border border-gray-300 rounded'
      />
      <button
        onClick={handleJoinRoom}
        className='bg-green-500 text-white py-2 px-4 rounded'
      >
        Join Room
      </button>
    </div>
  );
};

export default RoomSelection;
