import express, { type Express, type Request, type Response } from "express";

import { createClient } from "redis";
import { createServer } from "http";
import { RedisStore } from "connect-redis";
import passport from "passport";
import cors from "cors";
import isAuthenticated from "./Authentication/isAuthenticated";
import "dotenv/config";
//session
import { sessionMiddleware } from "./session";
//socket
import { initSocket } from "./socket";
//routers
import userRouter from "./Routers/UserRouter";
import authRouter from "./Routers/AuthRouter";
import postRouter from "./Routers/PostRouter";
import commentRouter from "./Routers/CommentRouter";
import likeRouter from "./Routers/LikeRouter";
import bookmarkRouter from "./Routers/BookmarkRouter";
import groupRouter from "./Routers/GroupRouter";
import inviteRouter from "./Routers/InviteRouter";
import followRouter from "./Routers/FollowRouter";
import chatRouter from "./Routers/ChatRouter";
import messageRouter from "./Routers/MessageRouter";

const app: Express = express();
const httpServer = createServer(app);

// Use dynamic environment variables for deployment
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const startServer = async () => {
  // 1. Pass the cloud connection string (e.g., Upstash) when deployed, fallback to local
  const redisClient = process.env.REDIS_URL
    ? createClient({ url: process.env.REDIS_URL })
    : createClient();

  await redisClient.connect().catch(console.error);

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  });

  app.use(express.json());

  // 2. Allow dynamic CORS based on environment
  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
    }),
  );

  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());

  initSocket(httpServer);

  app.use("/api/auth", authRouter);
  app.use("/api/user", isAuthenticated, userRouter);
  app.use("/api/post", isAuthenticated, postRouter);
  app.use("/api/comment", isAuthenticated, commentRouter);
  app.use("/api/like", isAuthenticated, likeRouter);
  app.use("/api/bookmark", isAuthenticated, bookmarkRouter);
  app.use("/api/group", isAuthenticated, groupRouter);
  app.use("/api/invite", isAuthenticated, inviteRouter);
  app.use("/api/follow", isAuthenticated, followRouter);
  app.use("/api/chat", isAuthenticated, chatRouter);
  app.use("/api/message", isAuthenticated, messageRouter);

  // 3. FIXED: Listen via httpServer so Socket.io routes function alongside Express
  httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
});
