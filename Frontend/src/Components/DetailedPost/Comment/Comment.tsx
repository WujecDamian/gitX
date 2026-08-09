import styles from "./Comment.module.css";
import { Link } from "react-router-dom";
//Comment subcomponents
import CommentHeader from "./subcomponents/CommentHeader";
import CommentContent from "./subcomponents/CommentContent";
import CommentMedia from "./subcomponents/CommentMedia";
import CommentActions from "./subcomponents/CommentActions";
import SubComment from "../SubComment/SubComment";

type props = {
  author: User;
  comment: CommentType;
};
export default function Comment(props: props) {
  return (
    <Link to={`/comment/${props.comment.id}`} className={styles.comment__card}>
      <CommentHeader
        author={props.author}
        comment={props.comment}
      ></CommentHeader>
      <div className={styles.comment__content__wrapper}>
        <CommentContent content={props.comment.content}></CommentContent>
        <CommentMedia media_url={props.comment.media_url}></CommentMedia>
        <CommentActions
          counts={props.comment._count}
          commentId={props.comment.id}
        ></CommentActions>
      </div>
      <div className="comment__replies">
        {props.comment.sub_comments.map((comment: CommentType) => (
          <SubComment
            author={comment.author}
            comment={comment}
            key={comment.id}
          ></SubComment>
        ))}
      </div>
    </Link>
  );
}
