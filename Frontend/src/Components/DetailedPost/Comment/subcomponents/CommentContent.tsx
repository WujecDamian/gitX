import styles from "../Comment.module.css";

type CommentContentTypes = {
  content: string;
};

export default function CommentContent({ content }: CommentContentTypes) {
  return (
    <>
      <p className={styles.post__content}>{content}</p>
    </>
  );
}
