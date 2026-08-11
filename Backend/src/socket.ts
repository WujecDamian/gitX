import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { sessionMiddleware } from "./session";

let io: SocketServer | null = null;

export const initSocket = (httpServer: HttpServer) => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
};

io.engine.use(sessionMiddleware);

io.use((socket, next) => {
  const sessionData = (socket.request as any).session;
  if (sessionData && sessionData.passport && sessionData.passport.user) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  const sessionData = (socket.request as any).session;
  const userId = sessionData.passport.user;

  socket.join(`user:${userId}`);

  socket.on("send_message", ({ recipientId, content, chatId }) => {
    io?.to(`user:${recipientId}`).emit("receive_message", {
      chatId,
      senderId: userId,
      content,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
  });

  return io;
});

export const getIO = (): SocketServer => {
  if (!io) throw new Error("Socket.io is not initialized!");
  return io;
};
