import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

const sendMessage = async (req: Request, res: Response) => {
  const { content, media_url } = req.body;
  const { chatId } = req.params;
  const senderId = req.user.id;

  if (typeof chatId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Chat ID" });
  }

  try {
    await prisma.message.create({
      data: {
        chat_id: chatId,
        content,
        media_url,
        senderId,
      },
    });
    return res.status(201).json({ message: "Successfully sent message!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message" });
  }
};

const sendGroupMessage = async (req: Request, res: Response) => {
  const { content, media_url } = req.body;
  const { chatId } = req.params;
  const senderId = req.user.id;

  if (typeof chatId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Chat ID" });
  }

  try {
    await prisma.message.create({
      data: {
        group_chat_id: chatId,
        content,
        media_url,
        senderId,
      },
    });
    return res
      .status(201)
      .json({ message: "Successfully sent message to group!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message to group" });
  }
};

export { sendMessage, sendGroupMessage };
