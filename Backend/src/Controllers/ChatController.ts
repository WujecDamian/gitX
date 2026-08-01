import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import passport from "passport";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";
import { type User } from "../generated/prisma/client";

//following / unfollowing User

const getOrCreateChat = async (req: Request, res: Response) => {
  const { recipientId } = req.params;
  const senderId = req.user.id;

  if (typeof recipientId !== "string") {
    return res.status(400).json({ error: "Invalid or missing recipient ID" });
  }

  const [user1_id, user2_id] = [senderId, recipientId].sort();

  try {
    const existingChat = await prisma.chat.findFirst({
      where: {
        user1_id,
        user2_id,
      },
    });
    if (existingChat) {
      return res
        .status(200)
        .json({ message: "Successfully queried chat!", chat: existingChat });
    }
    const newChat = await prisma.chat.create({
      data: {
        user1_id,
        user2_id,
      },
    });
    return res
      .status(201)
      .json({ message: "Successfully created chat!", chat: newChat });
  } catch (error) {
    return res.status(500).json({ error: "Failed to query / create chat" });
  }
};

const getGroupChat = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const senderId = req.user.id;

  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }

  try {
    const chat = await prisma.groupChat.findFirst({
      where: {
        groupId,
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully queried chat!", chat });
  } catch (error) {
    return res.status(500).json({ error: "Failed to query / create chat" });
  }
};

export { getOrCreateChat, getGroupChat };
