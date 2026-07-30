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
        chat: {
          create: {},
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
    });

    return res.status(200).json({ groups });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
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
  createGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  kickFromGroup,
};
