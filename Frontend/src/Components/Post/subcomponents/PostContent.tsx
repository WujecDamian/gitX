import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import styles from "../PostCard.module.css";

type PostContentTypes = {
  content: string;
};

export default function PostContent({ content }: PostContentTypes) {
  return (
    <>
      <p className={styles.post__content}>{content}</p>
    </>
  );
}
