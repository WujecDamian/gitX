import styles from "./PostCard.module.css";
import { useEffect, useRef, useState } from "react";
import ProfileDropdown from "../Navbar/components/ProfileDropdown";
import { ProfilePicture } from "../UI/ProfilePicture/ProfilePicture";
//PostCard subcomponents
import PostHeader from "./subcomponents/PostHeader";
import PostContent from "./subcomponents/PostContent";
import PostMedia from "./subcomponents/PostMedia";
import PostActions from "./subcomponents/PostActions";

type props = {
  author: User;
  post: Post;
};

export default function PostCard(props: props) {
  return (
    <div className={styles.post__card}>
      <PostHeader author={props.author} post={props.post}></PostHeader>
      <div className={styles.post__content__wrapper}>
        <PostContent content={props.post.content}></PostContent>
        <PostMedia media_url={props.post.media_url}></PostMedia>
        <PostActions
          counts={props.post._count}
          postId={props.post.id}
        ></PostActions>
      </div>
    </div>
  );
}
