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
    _count: { postLikes: number; comments: number };
  };
  type DetailedPost = {
    id: string;
    content: string;
    media_url?: string | null;
    author: User;
    createdAt: string;
    comments: [];
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
    sub_comments: [CommentType];
    _count: {
      commentLikes: number;
      sub_comments: number;
    };
  };
  type Chat = {
    id: string;
    message: Message;
    user1_id: string;
    user2_id: string;
    recipient: User;
  };
  type GroupChat = {
    id: string;
    message: Message;
    group_id: string;
  };
  type Message = {
    chat_id: string;
    content: string;
    createdAt: string;
    group_chat_id: string;
    id: string;
    media_url: string;
    senderId: string;
  };
}

export {};

/*
id
: 
"15455e29-9d4a-46eb-9f4a-ed37e3fe4830"
messages
: 
[]
user1_id
: 
"6edc16b9-628f-4d55-8ef9-e988e24d9e32"
user2_id
: 
"7ceb5b76-2dda-47c6-ae29-854f20cd0d0f" */
