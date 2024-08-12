import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

// Initialize application and socket server
const app: Application = express();
const server = http.createServer(app);
const io = new SocketIoServer(server);

app.use(express.json());

// Logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
});

// Socket.io connection
io.on('connection', (socket: Socket) => {
  console.log(`User (${socket.id}) connected.`);
});

// Simple error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong.');
});

// Listen the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
