import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

const getChats = async (req: Request, res: Response) => {
  const userId = req.user.id;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const rawChats = await prisma.chat.findMany({
      where: {
        OR: [{ user1_id: userId }, { user2_id: userId }],
      },
      include: {
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    const chats = await Promise.all(
      rawChats.map(async (chat) => {
        const recipientId =
          chat.user1_id === userId ? chat.user2_id : chat.user1_id;

        const recipient = await prisma.user.findUnique({
          where: { id: recipientId },
          select: {
            id: true,
            display_name: true,
            profile_picture_url: true,
          },
        });

        //return object (same as rawChats but with additional recipient data)
        return {
          id: chat.id,
          user1_id: chat.user1_id,
          user2_id: chat.user2_id,
          messages: chat.messages,
          recipient, // The resolved user profile
        };
      }),
    );
    return res
      .status(200)
      .json({ message: "Successfully queried chat!", chats });
  } catch (error) {
    return res.status(500).json({ error: "Failed to query / create chat" });
  }
};

const getGroupChats = async (req: Request, res: Response) => {
  const userId = req.user.id;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const groupChats = await prisma.groupChat.findMany({
      where: {
        group: {
          members: {
            some: {
              id: userId,
            },
          },
        },
      },
      include: {
        group: true,
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully queried chat!", groupChats });
  } catch (error) {
    return res.status(500).json({ error: "Failed to query / create chat" });
  }
};
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
        .json({ message: "Successfully queried chat!", chat: existingChat.id });
    }
    const newChat = await prisma.chat.create({
      data: {
        user1_id,
        user2_id,
      },
    });
    return res
      .status(201)
      .json({ message: "Successfully created chat!", chat: newChat.id });
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

export { getOrCreateChat, getGroupChat, getChats, getGroupChats };
