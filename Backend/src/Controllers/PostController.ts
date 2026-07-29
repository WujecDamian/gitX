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
const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res.status(200).json({ message: "Successfully deleted your post!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete post" });
  }
};

const createPost = async (req: Request, res: Response) => {
  const { content, media_url } = req.body;
  const authorId = req.user.id;

  try {
    await prisma.post.create({
      data: {
        author_id: authorId,
        content,
        media_url,
      },
    });

    return res.status(200).json({ message: "Successfully created post!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
  }
};

//Post get functions
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        groupId: null,
      },
      select: {
        author: true,
        id: true,
        content: true,
        media_url: true,
        createdAt: true,
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
    return res.status(500).json({ error: "Failed to create post" });
  }
};

const getFollowingPosts = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          followers: {
            some: {
              follower_id: userId,
            },
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
    return res.status(500).json({ error: "Failed to create post" });
  }
};

const getUserPosts = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const posts = await prisma.post.findMany({
      where: {
        author_id: userId,
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
    return res.status(500).json({ error: "Failed to create post" });
  }
};

const getGroupPosts = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }
  try {
    const posts = await prisma.post.findMany({
      where: {
        groupId: groupId,
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
    return res.status(500).json({ error: "Failed to create post" });
  }
};
export {
  deletePost,
  createPost,
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
  getGroupPosts,
};
