import { Server } from 'socket.io';

class SocketServer {
  io: Server | null = null;

  startServer = (server: any) => {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
      },
    });
  };

  sendToken = (token: string, socketId: string) => {
    this.io.sockets.emit(socketId, token);
  };
}

export const socketServer = new SocketServer();
