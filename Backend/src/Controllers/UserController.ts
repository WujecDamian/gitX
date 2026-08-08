import { type NextFunction, type Request, type Response } from "express";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

const editUserBio = async (req: Request, res: Response) => {
  try {
    const bio: string = req.body.bio;
    const id: string = req.user.id;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        bio,
      },
    });
    return res.status(200).json({ message: "Successfully updated bio!" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const editUserTags = async (req: Request, res: Response) => {
  try {
    const tags: Array<string> = req.body.tags;
    const id: string = req.user.id;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        tags,
      },
    });

    return res.status(200).json({ message: "Successfully updated tags!" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const editUserSocials = async (req: Request, res: Response) => {
  try {
    const socials: Array<string> = req.body.socials;
    const id: string = req.user.id;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        socials,
      },
    });

    return res.status(200).json({ message: "Successfully updated socials!" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const editUserDisplayName = async (req: Request, res: Response) => {
  try {
    const DisplayName: string = req.body.DisplayName;
    const id: string = req.user.id;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        display_name: DisplayName,
      },
    });
    return res
      .status(200)
      .json({ message: "Successfully updated DisplayName!" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const editUserPfp = async (req: Request, res: Response) => {
  try {
    const ProfilePictureUrl: string = req.body.ProfilePictureUrl;
    const id: string = req.user.id;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        profile_picture_url: ProfilePictureUrl,
      },
    });
    return res
      .status(200)
      .json({ message: "Successfully updated profile picture!" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const editUserBanner = async (req: Request, res: Response) => {
  try {
    const BannerPictureUrl: string = req.body.BannerPictureUrl;
    const id: string = req.user.id;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        banner_picture_url: BannerPictureUrl,
      },
    });
    return res
      .status(200)
      .json({ message: "Successfully updated banner picture!" });
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
        tags: true,
        posts: {
          include: {
            _count: true,
          },
        },
        _count: {
          select: { followers: true, following: true },
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully fetched user Profile!", userProfile });
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
export {
  editUserBio,
  editUserTags,
  editUserSocials,
  editUserDisplayName,
  editUserPfp,
  editUserBanner,
  deleteUser,
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
};
