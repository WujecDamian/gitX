import { type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";
import { commentEngagementInclude, nestComments } from "../lib/commentTree";

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
  const { content, media_url, groupId } = req.body;
  const authorId = req.user.id;

  if (typeof content !== "string" || content.trim().length === 0) {
    return res.status(400).json({ error: "Post content is required" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        author_id: authorId,
        content: content.trim(),
        media_url,
        groupId,
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
            user_id: authorId,
          },
          select: {
            id: true,
          },
        },
        bookmarks: {
          where: {
            user_id: authorId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Successfully created post!",
      post: {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: post.bookmarks.length > 0,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
  }
};

//Post get functions
const getAllPosts = async (req: Request, res: Response) => {
  const userId = req.user.id;

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

    const postsWithLiked = posts.map((post) => {
      return {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: post.bookmarks.length > 0,
      };
    });

    return res.status(200).json({ posts: postsWithLiked });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch post" });
  }
};

//Post get functions
const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (typeof postId !== "string") {
      return res.status(400).json({ error: "Invalid or missing Post ID" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        author: true,
        id: true,
        content: true,
        media_url: true,
        createdAt: true,
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
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({
      post: {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: post.bookmarks.length > 0,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch post" });
  }
};

//Post get functions
const getPostWithCommentsById = async (req: Request, res: Response) => {
  try {
    const newPostId = req.params.postId;
    const userId = req.user.id;

    if (!newPostId) {
      return res.status(400).json({ error: "Invalid post ID format" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: newPostId.toString(),
      },
      select: {
        author: true,
        id: true,
        content: true,
        media_url: true,
        createdAt: true,
        _count: {
          select: {
            postLikes: true,
            comments: true,
            bookmarks: true,
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
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comments = await prisma.comment.findMany({
      where: {
        post_id: post.id,
      },
      include: commentEngagementInclude(userId),
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      post: {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: post.bookmarks.length > 0,
        comments: nestComments(comments, null),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch post" });
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

    const postsWithLiked = posts.map((post) => {
      return {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: post.bookmarks.length > 0,
      };
    });

    return res.status(200).json({ posts: postsWithLiked });
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

    const postsWithLiked = posts.map((post) => {
      return {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: post.bookmarks.length > 0,
      };
    });

    return res.status(200).json({ posts: postsWithLiked });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
  }
};

const getGroupPosts = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const userId = req.user.id;
  if (typeof groupId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Group ID" });
  }
  try {
    const posts = await prisma.post.findMany({
      where: {
        groupId,
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

    const postsWithLiked = posts.map((post) => {
      return {
        ...post,
        isLikedByUser: post.postLikes.length > 0,
        isBookmarkedByUser: post.bookmarks.length > 0,
      };
    });

    return res.status(200).json({ posts: postsWithLiked });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};
export {
  deletePost,
  createPost,
  getAllPosts,
  getPostById,
  getPostWithCommentsById,
  getFollowingPosts,
  getUserPosts,
  getGroupPosts,
};
