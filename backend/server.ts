import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

// Initialize application and socket server
const app: Application = express();
const server = http.createServer(app);
const io = new SocketIoServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

// Logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Socket.io connection
io.on('connection', (socket: Socket) => {
  console.log(`User (${socket.id}) connected.`);

  socket.on('joinGame', (room: string) => {
    const clients = io.sockets.adapter.rooms.get(room);

    let playerColor = 'white';
    if (clients && clients.size === 1) {
      playerColor = 'black';
    }

    socket.join(room);
    console.log(`User (${socket.id}) joined the room - ${room}`);

    socket.emit('playerColor', playerColor);
  });

  socket.on('move', (data: { room: string; move: string }) => {
    io.to(data.room).emit('move', data.move);
  });

  socket.on('disconnect', () => {
    console.log(`User (${socket.id}) disconnected.`);
  });
});

// Simple error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong.');
});

// Listen the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
