import express, { type Express, type Request, type Response } from "express";

import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";
import passport from "passport";
import isAuthenticated from "./Authentication/isAuthenticated";
//routers
import userRouter from "./Routers/UserRouter";
import authRouter from "./Routers/AuthRouter";
import postRouter from "./Routers/PostRouter";
import commentRouter from "./Routers/CommentRouter";
import likeRouter from "./Routers/LikeRouter";
import bookmarkRouter from "./Routers/BookmarkRouter";
const app: Express = express();

//as async function to wait for connection to Redis server
const startServer = async () => {
  const redisClient = createClient();
  await redisClient.connect().catch(console.error);

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  });

  //body parser to handle JSON from req
  app.use(express.json());

  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      secret: process.env.REDIS_SECRET as string,
    }),
  );

  app.use(passport.initialize()); //adds authentication hooks to req
  app.use(passport.session()); // related to serialize/deSerialize functions, makes req.user available

  app.use("/api/auth", authRouter);
  app.use("/api/user", isAuthenticated, userRouter);
  app.use("/api/post", isAuthenticated, postRouter);
  app.use("/api/comment", isAuthenticated, commentRouter);
  app.use("/api/like", isAuthenticated, likeRouter);
  app.use("/api/bookmark", isAuthenticated, bookmarkRouter);

  app.listen(3000);
  console.log("Server is listening on port http://localhost:3000");
};

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
});
