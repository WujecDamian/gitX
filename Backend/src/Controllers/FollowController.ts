import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

//following / unfollowing User

const followUser = async (req: Request, res: Response) => {
  const { followedId } = req.params;
  const followerId = req.user.id;

  if (typeof followedId !== "string") {
    return res.status(400).json({ error: "Invalid or missing target ID" });
  }

  try {
    await prisma.follows.create({
      data: {
        follower_id: followerId,
        following_id: followedId,
      },
    });

    return res.status(201).json({ message: "Successfully followed user!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to follow user" });
  }
};

const unfollowUser = async (req: Request, res: Response) => {
  const { followedId } = req.params;
  const followerId = req.user.id;

  if (typeof followedId !== "string") {
    return res.status(400).json({ error: "Invalid or missing target ID" });
  }

  try {
    await prisma.follows.deleteMany({
      where: {
        follower_id: followerId,
        following_id: followedId,
      },
    });

    return res.status(201).json({ message: "Successfully followed user!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to follow user" });
  }
};

const getFollowedByList = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const followedByList = await prisma.follows.findMany({
      where: {
        following_id: userId,
      },
      select: {
        follower_id: true,
        follower: {
          select: {
            id: true,
            username: true,
            display_name: true,
          },
        },
      },
    });

    return res.status(200).json({ followedByList });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch followed by list" });
  }
};

const getFollowingList = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const followingList = await prisma.follows.findMany({
      where: {
        follower_id: userId,
      },
      select: {
        following_id: true,
        following: {
          select: {
            id: true,
            username: true,
            display_name: true,
          },
        },
      },
    });

    return res.status(200).json({ followingList });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch following list" });
  }
};

export { followUser, unfollowUser, getFollowedByList, getFollowingList };
