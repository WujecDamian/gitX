import express, { type Express, type Request, type Response } from "express";
import userRouter from "./Routers/UserRouter";
import authRouter from "./Routers/AuthRouter";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";
import passport from "passport";
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
  app.use(passport.session()); // related do serialize/deSerialize functions, makes req.user available

  app.use("/api/user", userRouter);
  app.use("/api/auth", authRouter);

  app.listen(3000);
  console.log("Server is listening on port http://localhost:3000");
};

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
});
