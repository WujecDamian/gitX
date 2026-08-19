import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

// 1. Dynamic Redis connection: Use Upstash URL in cloud, default local configuration locally
const redisClient = process.env.REDIS_URL
  ? createClient({ url: process.env.REDIS_URL })
  : createClient();

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

// 2. Identify if the application running context is production
const isProduction = process.env.NODE_ENV === "production";

export const sessionMiddleware = session({
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  // Cast safely, but provide a safe fallback string for local testing environments
  secret: (process.env.REDIS_SECRET ||
    process.env.SESSION_SECRET ||
    "local_fallback_secret") as string,

  // 3. Mandatory additions for Cross-Origin (Vercel to Render) Cookie passing
  proxy: isProduction, // Trust the cloud provider's reverse proxy for HTTPS certificates
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Keep sessions active for week
    httpOnly: true, // Block access to cookies from frontend scripts
    secure: isProduction, // Force HTTPS transmission only in production
    sameSite: isProduction ? "none" : "lax", // Crucial: Allow cookies to be shared between different domains
  },
});
