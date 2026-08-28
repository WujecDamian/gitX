import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import styles from "../PostCard.module.css";
import { useAuth } from "../../../Contexts/Auth/AuthContext";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../../Layouts/GridLayout";
import { API_URL } from "../../../config";

type PostActionsTypes = {
  counts: { postLikes: number; comments: number };
  postId: string;
};
export default function PostActions({ counts, postId }: PostActionsTypes) {
  const { user } = useAuth();
  const [error, setError] = useState<String | null>(null);
  const { setIsCommentModalOpen, setCommentPostId } =
    useOutletContext<LayoutContextType>();

  const onLikeClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(`${API_URL}/api/like/post/${postId}`, {
        method: "POST",
        credentials: "include",
      });

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
      const response = await fetch(`${API_URL}/api/bookmark/post/${postId}`, {
        method: "POST",
        credentials: "include",
      });

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
    <section className={styles.post__actions}>
      <div
        className={styles.comments}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          setIsCommentModalOpen(true);
          setCommentPostId(postId);
        }}
      >
        <button className={styles.comment}>
          <img
            src="/icons/mode_comment_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Comment icon"
          />
        </button>
        <span className={styles.count}>{counts.comments}</span>
      </div>
      <div className={styles.likes} onClick={onLikeClick}>
        <button className={styles.like}>
          <img
            src="/icons/favorite_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Heart icon"
          />
        </button>
        <span className={styles.count}>{counts.postLikes}</span>
      </div>
      <div className={styles.bookmarks} onClick={onBookmarkClick}>
        <button className={styles.bookmark}>
          <img
            src="/icons/bookmark_24dp_E3E3E3_FILL0_wght300_GRAD-25_opsz24.svg"
            alt="Bookmark icon"
          />
        </button>
      </div>
      {error && <span>{error}</span>}
    </section>
  );
}
