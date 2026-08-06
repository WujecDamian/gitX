import styles from "../SubComment.module.css";

type CommentContentTypes = {
  content: string;
};

export default function SubCommentContent({ content }: CommentContentTypes) {
  return (
    <>
      <p className={styles.post__content}>{content}</p>
    </>
  );
}
