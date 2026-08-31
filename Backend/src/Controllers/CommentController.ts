import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";
import {
  commentEngagementInclude,
  findCommentInTree,
  nestComments,
} from "../lib/commentTree";

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
    return res
      .status(400)
      .json({ error: "Invalid or missing Post/Comment ID" });
  }

  if (typeof content !== "string" || content.trim().length === 0) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        author_id: authorId,
        post_id: postId,
        content: content.trim(),
        media_url,
      },
      include: {
        author: true,
        _count: {
          select: {
            commentLikes: true,
            sub_comments: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Successfully created comment!",
      comment: {
        ...comment,
        isLikedByUser: false,
        isBookmarkedByUser: false,
        sub_comments: [],
      },
    });
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

  if (typeof content !== "string" || content.trim().length === 0) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        author_id: authorId,
        post_id: postId,
        content: content.trim(),
        media_url,
        sub_comment_id: commentId,
      },
      include: {
        author: true,
        _count: {
          select: {
            commentLikes: true,
            sub_comments: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Successfully created comment!",
      comment: {
        ...comment,
        isLikedByUser: false,
        isBookmarkedByUser: false,
        sub_comments: [],
      },
    });
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
      },
      include: commentEngagementInclude(req.user.id),
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      comments: nestComments(comments, null),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
  }
};

//Post get functions
const getComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;

  if (typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        id: true,
        post_id: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const comments = await prisma.comment.findMany({
      where: {
        post_id: comment.post_id,
      },
      include: commentEngagementInclude(req.user.id),
      orderBy: {
        createdAt: "desc",
      },
    });

    const commentTree = nestComments(comments, null);
    const commentWithReplies = findCommentInTree(commentTree, commentId);

    if (!commentWithReplies) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json({
      comment: commentWithReplies,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
  }
};
export {
  createComment,
  createSubComment,
  deleteComment,
  getPostComments,
  getComment,
};
