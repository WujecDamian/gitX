import styles from "./DetailedPostCard.module.css";
import { Link } from "react-router-dom";
//DetailedPostCard subcomponents
import DetailedPostHeader from "./subcomponents/DetailedPostHeader";
import DetailedPostContent from "./subcomponents/DetailedPostContent";
import DetailedPostMedia from "./subcomponents/DetailedPostMedia";
import DetailedPostActions from "./subcomponents/DetailedPostActions";

type props = {
  author: User;
  post: DetailedPost;
};

export default function DetailedPostCard(props: props) {
  return (
    <Link to={`/post/${props.post.id}`} className={styles.post__card}>
      <DetailedPostHeader
        author={props.author}
        post={props.post}
      ></DetailedPostHeader>
      <div className={styles.post__content__wrapper}>
        <DetailedPostContent content={props.post.content}></DetailedPostContent>
        <DetailedPostMedia media_url={props.post.media_url}></DetailedPostMedia>
        <DetailedPostActions
          counts={props.post._count}
          postId={props.post.id}
          isLikedByUser={props.post.isLikedByUser}
          isBookmarkedByUser={props.post.isBookmarkedByUser}
        ></DetailedPostActions>
      </div>
    </Link>
  );
}
