import { ProfilePicture } from "../../../UI/ProfilePicture/ProfilePicture";
import styles from "../Comment.module.css";
import { TimePosted } from "../../../UI/Time/TimePosted";

type CommentHeaderTypes = {
  author: User;
  comment: CommentType;
};

export default function CommentHeader(props: CommentHeaderTypes) {
  console.log(props.author);

  return (
    <>
      <div className={styles.comment__header}>
        <ProfilePicture url={props.author.profile_picture_url}></ProfilePicture>
        <div className={styles.comment__header__text__wrapper}>
          <h3 className="user__name">{props.author.display_name}</h3>

          <span className="user__handle">@{props.author.username}</span>
          <span className="separator" aria-hidden="true">
            •
          </span>

          <TimePosted createTime={props.comment.createdAt}></TimePosted>
        </div>
      </div>
    </>
  );
}
