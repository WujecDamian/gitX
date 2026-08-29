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
    posts: Post;
    follower: User;
    following: User;
    _count: {
      following: number;
      followers: number;
    };
  };

  type Post = {
    id: string;
    content: string;
    media_url?: string | null;
    author: User;
    createdAt: string;
    isLikedByUser: boolean;
    isBookmarkedByUser: boolean;
    _count: { postLikes: number; comments: number };
  };
  type DetailedPost = {
    id: string;
    content: string;
    media_url?: string | null;
    author: User;
    createdAt: string;
    comments: CommentType[];
    isLikedByUser: boolean;
    isBookmarkedByUser: boolean;
    _count: { postLikes: number; comments: number; bookmarks: number };
  };
  type CommentType = {
    author: User;
    author_id: string;
    content: string;
    createdAt: string;
    id: string;
    media_url?: string;
    post_id: string;
    sub_comment_id?: string;
    sub_comments: CommentType[];
    isLikedByUser: boolean;
    isBookmarkedByUser: boolean;
    _count: {
      commentLikes: number;
      sub_comments: number;
    };
  };
  type Chat = {
    id: string;
    messages: Message[0];
    user1_id: string;
    user2_id: string;
    recipient: User;
  };
  type GroupChat = {
    id: string;
    message: Message;
    group_id: string;
    name: string;
    description: string;
    picture_url: string;
    messages: Message[0];
  };
  type Message = {
    chat_id: string;
    content: string;
    createdAt: string;
    group_chat_id: string;
    id: string;
    media_url: string;
    senderId: string;
    sender: User;
  };

  type Group = {
    group_name: string;
    group_profile_picture_url: string;
    group_banner_picture_url: string;
    bio: string;
    id: string;
    createdAt: string;
    creator_id: string;
    _count: {
      members: number;
    };
    members?: { id: string }[];
  };
}

export {};
