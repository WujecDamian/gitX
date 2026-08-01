import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

//deleting / creating Post

const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user.id;

  if (typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    await prisma.postLike.create({
      data: {
        user_id: userId,
        post_id: postId,
      },
    });

    return res.status(201).json({ message: "Successfully liked post!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to like post" });
  }
};

const unlikePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user.id;

  if (typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    await prisma.postLike.deleteMany({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    return res.status(200).json({ message: "Successfully unliked post!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to unlike post" });
  }
};
const likeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  if (typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    await prisma.commentLike.create({
      data: {
        user_id: userId,
        comment_id: commentId,
      },
    });

    return res.status(201).json({ message: "Successfully liked post!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to like post" });
  }
};
const unlikeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  if (typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Comment ID" });
  }

  try {
    await prisma.commentLike.deleteMany({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    });

    return res.status(200).json({ message: "Successfully unliked comment!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to unlike comment" });
  }
};

//Post get functions
const getLikedPosts = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const posts = await prisma.post.findMany({
      where: {
        postLikes: {
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
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export { likePost, unlikePost, likeComment, unlikeComment, getLikedPosts };
