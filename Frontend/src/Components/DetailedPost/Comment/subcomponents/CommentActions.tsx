import styles from "../Comment.module.css";
import { useAuth } from "../../../../Contexts/Auth/AuthContext";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../../../Layouts/GridLayout";

type CommentActionsTypes = {
  counts: { commentLikes: number; sub_comments: number };
  commentId: string;
};
export default function CommentActions({
  counts,
  commentId,
}: CommentActionsTypes) {
  const { user } = useAuth();
  const [error, setError] = useState<String | null>(null);
  const { setIsCommentOnCommentModalOpen, setCommentId } =
    useOutletContext<LayoutContextType>();

  const onLikeClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:3000/api/like/comment/${commentId}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const onBookmarkClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:3000/api/bookmark/comment/${commentId}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <section className={styles.comment__actions}>
      <div
        className={styles.comments}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          setIsCommentOnCommentModalOpen(true);
          setCommentId(commentId);
        }}
      >
        <button className={styles.comment}>
          <img
            src="../Frontend/public/icons/mode_comment_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Comment icon"
          />
        </button>
        <span className={styles.count}>{counts.sub_comments}</span>
      </div>
      <div className={styles.likes} onClick={onLikeClick}>
        <button className={styles.like}>
          <img
            src="../Frontend/public/icons/favorite_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Heart icon"
          />
        </button>
        <span className={styles.count}>{counts.commentLikes}</span>
      </div>
      <div className={styles.bookmarks} onClick={onBookmarkClick}>
        <button className={styles.bookmark}>
          <img
            src="../Frontend/public/icons/bookmark_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Bookmark icon"
          />
        </button>
      </div>
      {error && <span>{error}</span>}
    </section>
  );
}
