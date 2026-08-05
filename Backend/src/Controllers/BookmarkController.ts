import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

//deleting / creating Post

const bookmarkPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user.id;

  if (typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    const hasBookmarked = await prisma.bookmark.findMany({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });
    console.log(hasBookmarked);
    if (hasBookmarked.length > 0) {
      await prisma.bookmark.deleteMany({
        where: {
          user_id: userId,
          post_id: postId,
        },
      });
    } else {
      await prisma.bookmark.create({
        data: {
          user_id: userId,
          post_id: postId,
        },
      });
    }

    return res.status(201).json({ message: "Successfully bookmarked post!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to bookmark post" });
  }
};

const unbookmarkPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user.id;

  if (typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    await prisma.bookmark.deleteMany({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    return res.status(200).json({ message: "Successfully unbookmarked post!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to unbookmark post" });
  }
};

//Post get functions
const getBookmarkedPosts = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const posts = await prisma.post.findMany({
      where: {
        bookmarks: {
          some: {
            user_id: userId,
          },
        },
      },
      select: {
        author: true,
        id: true,
        content: true,
        createdAt: true,
        media_url: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch bookmarked posts" });
  }
};

export { bookmarkPost, unbookmarkPost, getBookmarkedPosts };
