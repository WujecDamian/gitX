import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import styles from "../PostCard.module.css";

type PostActionsTypes = {
  counts: { postLikes: number; comments: number };
};
export default function PostActions({ counts }: PostActionsTypes) {
  return (
    <section className={styles.post__actions}>
      <div className={styles.comments}>
        <button className={styles.comment}>
          <img
            src="Frontend/public/icons/mode_comment_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Comment icon"
          />
        </button>
        <span className={styles.count}>{counts.comments}</span>
      </div>
      <div className={styles.likes}>
        <button className={styles.like}>
          <img
            src="Frontend/public/icons/favorite_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Heart icon"
          />
        </button>
        <span className={styles.count}>{counts.postLikes}</span>
      </div>
      <div className={styles.bookmarks}>
        <button className={styles.bookmark}>
          <img
            src="Frontend/public/icons/bookmark_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Bookmark icon"
          />
        </button>
      </div>
    </section>
  );
}
