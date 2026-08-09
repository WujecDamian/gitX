import { User as PrismaUser, Post as PrismaPost } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: PrismaUser;
    }
  }
}

export {};
