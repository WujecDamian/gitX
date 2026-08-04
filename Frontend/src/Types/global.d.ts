import { User as PrismaUser, Post as PrismaPost } from "@prisma/client";

declare global {
  module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  type User = {
    banner_picture_url?: string;
    bio?: string;
    createdAt: string;
    display_name: string;
    email?: string;
    github_id: string;
    github_profile_url: string;
    id: string;
    profile_picture_url: string;
    socials?: string[];
    tags?: string[];
    username: string;
  };

  type Post = {
    id: string;
    content: string;
    media_url?: string | null;
    author: User;
    createdAt: string;
    _count: { postLikes: number; comments: number; bookmarks: number };
  };
}

export {};
