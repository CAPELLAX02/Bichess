import { io } from 'socket.io-client';

const socket = io(
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  {
    transports: ['websocket'],
    withCredentials: true,
  }
);

// A ternary logic might be added here using 'production' and 'development'. Not sure.

export default socket;
