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

    const bookmarkCount = await prisma.bookmark.count({
      where: {
        post_id: postId,
      },
    });
    const isBookmarkedByUser = hasBookmarked.length === 0;

    return res.status(201).json({
      message: "Successfully bookmarked post!",
      isBookmarkedByUser,
      bookmarkCount,
    });
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

    const bookmarkCount = await prisma.bookmark.count({
      where: {
        post_id: postId,
      },
    });

    return res.status(200).json({
      message: "Successfully unbookmarked post!",
      isBookmarkedByUser: false,
      bookmarkCount,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to unbookmark post" });
  }
};

const bookmarkComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  if (typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Comment ID" });
  }

  try {
    const hasBookmarked = await prisma.commentBookmark.findMany({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    });

    if (hasBookmarked.length > 0) {
      await prisma.commentBookmark.deleteMany({
        where: {
          user_id: userId,
          comment_id: commentId,
        },
      });
    } else {
      await prisma.commentBookmark.create({
        data: {
          user_id: userId,
          comment_id: commentId,
        },
      });
    }

    const bookmarkCount = await prisma.commentBookmark.count({
      where: {
        comment_id: commentId,
      },
    });
    const isBookmarkedByUser = hasBookmarked.length === 0;

    return res.status(201).json({
      message: "Successfully bookmarked comment!",
      isBookmarkedByUser,
      bookmarkCount,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to bookmark comment" });
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

    const postsWithFlags = posts.map((post) => {
      return {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: true,
      };
    });

    return res.status(200).json({ posts: postsWithFlags });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch bookmarked posts" });
  }
};

export { bookmarkPost, unbookmarkPost, bookmarkComment, getBookmarkedPosts };
