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
  const { chatId } = req.params;

  if (typeof chatId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }

  try {
    const chat = await prisma.groupChat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          include: {
            sender: {
              select: {
                username: true,
                display_name: true,
                profile_picture_url: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully queried chat!", chat });
  } catch (error) {
    return res.status(500).json({ error: "Failed to query / create chat" });
  }
};

//get specific chat (detailed)

const getChat = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const userId = req.user.id; // Using userId to match your first query's naming

  if (typeof chatId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Chat ID" });
  }

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    // 1. Fetch the specific chat and verify the user is a participant
    const rawChat = await prisma.chat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc", // "asc" so history scrolls oldest to newest
          },
        },
      },
    });

    // Handle 404 if chat doesn't exist or user doesn't have access
    if (!rawChat) {
      return res.status(404).json({ error: "Chat not found or access denied" });
    }

    // 2. Identify and fetch the recipient profile data
    const recipientId =
      rawChat.user1_id === userId ? rawChat.user2_id : rawChat.user1_id;

    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
      select: {
        id: true,
        display_name: true,
        profile_picture_url: true,
      },
    });

    // 3. Construct the matching unified payload structure
    const chat = {
      id: rawChat.id,
      user1_id: rawChat.user1_id,
      user2_id: rawChat.user2_id,
      messages: rawChat.messages,
      recipient,
    };

    return res
      .status(200)
      .json({ message: "Successfully queried chat!", chat });
  } catch (error) {
    return res.status(500).json({ error: "Failed to query chat history" });
  }
};

// ? SENDING MESSAGES
const sendMessage = async (req: Request, res: Response) => {
  const { content, mediaUrl, chatId } = req.body;
  const senderId = req.user.id;

  if (typeof chatId !== "string") {
    return res.status(400).json({ error: "Invalid or missing chat ID" });
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        chat_id: chatId,
        content,
        media_url: mediaUrl,
        senderId,
      },
    });
    return res
      .status(201)
      .json({ message: "Successfully created chat!", newMessage });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message" });
  }
};

export {
  getOrCreateChat,
  getGroupChat,
  getChats,
  getGroupChats,
  getChat,
  sendMessage,
};
