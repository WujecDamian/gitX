import { type NextFunction, type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

const toOptionalText = (value: unknown) => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const toStringArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return null;
  }
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const displayName = toOptionalText(req.body.display_name);
    if (!displayName) {
      return res.status(400).json({ error: "Display name is required" });
    }
    const status = toOptionalText(req.body.status);

    const tags = toStringArray(req.body.tags);
    const socials = toStringArray(req.body.socials);
    if (!tags || !socials) {
      return res
        .status(400)
        .json({ error: "Tags and socials must be arrays of strings" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        display_name: displayName,
        bio: toOptionalText(req.body.bio),
        tags,
        socials,
        status,
        profile_picture_url: toOptionalText(req.body.profile_picture_url),
        banner_picture_url: toOptionalText(req.body.banner_picture_url),
      },
      select: {
        id: true,
        banner_picture_url: true,
        bio: true,
        createdAt: true,
        username: true,
        display_name: true,
        github_profile_url: true,
        profile_picture_url: true,
        socials: true,
        status: true,
        tags: true,
      },
    });

    return res.status(200).json({
      message: "Successfully updated profile!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

//deleting user

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.user.id;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    req.logout((error) => {
      if (error) {
        return next(error);
      }
      req.session.destroy((destroyError) => {
        if (destroyError) {
          return res
            .status(500)
            .json({ error: "Failed to destroy session cache" });
        }
        res.clearCookie("connect.sid", {
          path: "/",
        });
        return res
          .status(200)
          .json({ message: "Successfully deleted your account!" });
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const user = req.user;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        banner_picture_url: true,
        bio: true,
        createdAt: true,
        username: true,
        display_name: true,
        github_profile_url: true,
        profile_picture_url: true,
        socials: true,
        status: true,
        tags: true,
        posts: {
          include: {
            _count: true,
            postLikes: {
              where: {
                user_id: user.id,
              },
              select: {
                id: true,
              },
            },
            bookmarks: {
              where: {
                user_id: user.id,
              },
              select: {
                id: true,
              },
            },
          },
        },
        followers: {
          where: {
            follower_id: user.id,
          },
          select: {
            id: true,
          },
        },
        _count: {
          select: { followers: true, following: true },
        },
      },
    });
    //logic for checking if user is following
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    const isFollowing =
      Array.isArray(userProfile.followers) && userProfile.followers.length > 0;
    return res.status(200).json({
      message: "Successfully fetched user Profile!",
      userProfile: {
        ...userProfile,
        posts: userProfile.posts.map((post) => {
          return {
            ...post,
            isLikedByUser: post.postLikes.length > 0,
            isBookmarkedByUser: post.bookmarks.length > 0,
          };
        }),
      },
      isFollowing,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getUserFollowing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const following = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        following: {
          orderBy: {
            following: {
              followers: {
                _count: "desc", // Orders by highest follower count first
              },
            },
          },
          include: {
            following: {
              include: {
                _count: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      message: "Successfully fetched user Following List!",
      following: following?.following,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getUserFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const followers = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followers: {
          orderBy: {
            follower: {
              followers: {
                _count: "desc", // Orders by highest follower count first
              },
            },
          },
          include: {
            follower: {
              include: {
                _count: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      message: "Successfully fetched user Following List!",
      followers: followers?.followers,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const searchUsers = async (req: Request, res: Response) => {
  const { query } = req.query;
  const userId = req.user.id;

  if (typeof query !== "string" || query.trim().length === 0) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const trimmed = query.trim();

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        OR: [
          {
            username: {
              contains: trimmed,
              mode: "insensitive",
            },
          },
          {
            display_name: {
              contains: trimmed,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        display_name: true,
        profile_picture_url: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 20,
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Failed to search users" });
  }
};

export {
  updateProfile,
  deleteUser,
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
  searchUsers,
};
