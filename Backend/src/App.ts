import express, { type Express, type Request, type Response } from "express";
import userRouter from "./Routers/UserRouter";
import authRouter from "./Routers/AuthRouter";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";
import passport from "passport";
const app: Express = express();

// 1. Initialize Redis and Session
let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET as string,
  }),
);

// 2. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000);
console.log("Server is listening on port http://localhost:3000");
