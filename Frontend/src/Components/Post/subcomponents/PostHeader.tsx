import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import styles from "../PostCard.module.css";
import { TimePosted } from "../../UI/Time/TimePosted";
import { Link } from "react-router-dom";

type PostHeaderTypes = {
  author: User;
  post: Post;
};

export default function PostHeader(props: PostHeaderTypes) {
  return (
    <>
      <Link to={`/profile/${props.author.id}`} className={styles.post__header}>
        <ProfilePicture url={props.author.profile_picture_url}></ProfilePicture>
        <div className={styles.post__header__text__wrapper}>
          <h3 className="user__name">{props.author.display_name}</h3>

          <span className="user__handle">@{props.author.username}</span>
          <span className="separator" aria-hidden="true">
            •
          </span>

          <TimePosted createTime={props.post.createdAt}></TimePosted>
        </div>
      </Link>
    </>
  );
}
