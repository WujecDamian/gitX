import { Router, type Request, type Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client/extension";
import cookieSession from "cookie-session";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import * as authController from "../Controllers/AuthController";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

router.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET as string, //as string because env can be undefined
  }),
);
router.use(passport.initialize());
router.use(passport.session());
router.get("/", authController.greetUser);
router.get("/error", authController.loginError);
router.get("/github", authController.authenticateUser);
router.get(
  "/github/callback",
  authController.callbackAuthenticate,
  authController.handleSuccess,
);

export default router;
