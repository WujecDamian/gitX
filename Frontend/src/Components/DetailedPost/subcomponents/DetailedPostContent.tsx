import styles from "../PostCard.module.css";

type PostContentTypes = {
  content: string;
};

export default function DetailedPostContent({ content }: PostContentTypes) {
  return (
    <>
      <p className={styles.post__content}>{content}</p>
    </>
  );
}
