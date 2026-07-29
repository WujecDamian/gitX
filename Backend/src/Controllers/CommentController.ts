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
const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  if (typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Comment ID" });
  }
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully deleted your comment!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete comment" });
  }
};

const createComment = async (req: Request, res: Response) => {
  const { content, media_url } = req.body;
  const { postId } = req.params;
  const authorId = req.user.id;

  if (typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    await prisma.comment.create({
      data: {
        author_id: authorId,
        post_id: postId,
        content,
        media_url,
      },
    });

    return res.status(201).json({ message: "Successfully created comment!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create comment" });
  }
};

const createSubComment = async (req: Request, res: Response) => {
  const { content, media_url } = req.body;
  const { postId, commentId } = req.params;
  const authorId = req.user.id;

  if (typeof postId !== "string" || typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    await prisma.comment.create({
      data: {
        author_id: authorId,
        post_id: postId,
        content,
        media_url,
        sub_comment_id: commentId,
      },
    });

    return res.status(201).json({ message: "Successfully created comment!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create comment" });
  }
};

//Post get functions
const getPostComments = async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }
  try {
    const comments = await prisma.comment.findMany({
      where: {
        post_id: postId,
        sub_comment_id: null,
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
            sub_comments: true,
          },
        },
        sub_comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },

      orderBy: [
        {
          likes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
  }
};

export { createComment, createSubComment, deleteComment, getPostComments };
