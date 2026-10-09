import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const isProduction = !!process.env.REDIS_URL;

const redisClient = process.env.REDIS_URL
  ? createClient({ url: process.env.REDIS_URL })
  : createClient();

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

export const sessionMiddleware = session({
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: (process.env.REDIS_SECRET ||
    process.env.SESSION_SECRET ||
    "local_fallback_secret") as string,

  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Keep sessions active for week
    httpOnly: true, // Block access to cookies from frontend scripts
    secure: isProduction,
    sameSite: "lax", // Crucial: Allow cookies to be shared between different domains
    domain: isProduction ? ".wujecdamian.dev" : undefined,
  },
});
