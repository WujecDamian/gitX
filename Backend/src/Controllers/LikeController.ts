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
    const hasLiked = await prisma.postLike.findMany({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });
    console.log(hasLiked);
    if (hasLiked.length > 0) {
      await prisma.postLike.deleteMany({
        where: {
          user_id: userId,
          post_id: postId,
        },
      });
    } else {
      await prisma.postLike.create({
        data: {
          user_id: userId,
          post_id: postId,
        },
      });
    }

    const likeCount = await prisma.postLike.count({
      where: {
        post_id: postId,
      },
    });
    const isLikedByUser = hasLiked.length === 0;

    return res.status(201).json({
      message: "Successfully liked post!",
      isLikedByUser,
      likeCount,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to like post" });
  }
};

const likeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  if (typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Post ID" });
  }

  try {
    const hasLiked = await prisma.commentLike.findMany({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    });
    console.log(hasLiked);
    if (hasLiked.length > 0) {
      await prisma.commentLike.deleteMany({
        where: {
          user_id: userId,
          comment_id: commentId,
        },
      });
    } else {
      await prisma.commentLike.create({
        data: {
          user_id: userId,
          comment_id: commentId,
        },
      });
    }

    const likeCount = await prisma.commentLike.count({
      where: {
        comment_id: commentId,
      },
    });
    const isLikedByUser = hasLiked.length === 0;

    return res.status(201).json({
      message: "Successfully liked comment!",
      isLikedByUser,
      likeCount,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to like comment" });
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
            postLikes: true,
            comments: true,
          },
        },
        postLikes: {
          where: {
            user_id: userId,
          },
          select: {
            id: true,
          },
        },
        bookmarks: {
          where: {
            user_id: userId,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      posts: posts.map((post) => {
        return {
          ...post,
          isLikedByUser: post.postLikes.length > 0,
          isBookmarkedByUser: post.bookmarks.length > 0,
        };
      }),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export { likePost, likeComment, getLikedPosts };
