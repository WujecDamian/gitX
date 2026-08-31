import styles from "./SubComment.module.css";
import { Link } from "react-router-dom";
//Comment subcomponents
import SubCommentHeader from "./subcomponents/SubCommentHeader";
import SubCommentContent from "./subcomponents/SubCommentContent";
import SubCommentMedia from "./subcomponents/SubCommentMedia";
import SubCommentActions from "./subcomponents/SubCommentActions";

type props = {
  author: User;
  comment: CommentType;
};
export default function SubComment(props: props) {
  return (
    <article className={styles.comment__thread}>
      <Link to={`/comment/${props.comment.id}`} className={styles.comment__card}>
        <SubCommentHeader
          author={props.author}
          comment={props.comment}
        ></SubCommentHeader>
        <div className={styles.comment__content__wrapper}>
          <SubCommentContent content={props.comment.content}></SubCommentContent>
          <SubCommentMedia media_url={props.comment.media_url}></SubCommentMedia>
          <SubCommentActions
            counts={props.comment._count}
            commentId={props.comment.id}
            isLikedByUser={props.comment.isLikedByUser}
            isBookmarkedByUser={props.comment.isBookmarkedByUser}
          ></SubCommentActions>
        </div>
      </Link>
      <div className={styles.comment__replies}>
        {props.comment.sub_comments?.map((comment: CommentType) => (
          <SubComment
            author={comment.author}
            comment={comment}
            key={comment.id}
          ></SubComment>
        ))}
      </div>
    </article>
  );
}
