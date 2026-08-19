import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

//deleting / creating Post
const deleteGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }
  try {
    const deletionResult = await prisma.group.deleteMany({
      where: {
        id: groupId,
        creator_id: userId,
      },
    });
    if (deletionResult.count === 0) {
      return res.status(403).json({ error: "Unauthorized or Group not found" });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted your group!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete group" });
  }
};

const createGroup = async (req: Request, res: Response) => {
  const { groupName } = req.body;
  const userId = req.user.id;

  try {
    await prisma.group.create({
      data: {
        group_name: groupName,
        creator_id: userId,
        groupChats: {
          create: {},
        },
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res.status(201).json({ message: "Successfully created group!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create group" });
  }
};

const getUserGroups = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        group_name: true,
        group_profile_picture_url: true,
        id: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    return res.status(200).json({ groups });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch group" });
  }
};

const getGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    return res.status(200).json({ group });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch group" });
  }
};

const getGroupMembers = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }
  try {
    const members = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        members: {
          include: {
            _count: {
              select: {
                followers: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({ members });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch group" });
  }
};

const getGroupChats = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }
  try {
    const chats = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        groupChats: {
          include: {
            messages: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    return res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch group chats" });
  }
};

const joinGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }

  try {
    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });

    return res.status(201).json({ message: "Successfully joined group!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to join group" });
  }
};

const leaveGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }

  try {
    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully disconnected group!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to disconnect group" });
  }
};

const kickFromGroup = async (req: Request, res: Response) => {
  const { groupId, userId } = req.params;

  if (typeof groupId !== "string" || typeof userId !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid or missing Group ID or User ID" });
  }

  try {
    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });

    return res.status(201).json({ message: "Successfully kicked from group!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to kick from group" });
  }
};
export {
  getUserGroups,
  getGroup,
  getGroupMembers,
  getGroupChats,
  createGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  kickFromGroup,
};
