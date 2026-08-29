import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NewCommentOnComment.module.css";
import CommentHeader from "../DetailedPost/Comment/subcomponents/CommentHeader";
import CommentContent from "../DetailedPost/Comment/subcomponents/CommentContent";
import { API_URL } from "../../config";
import type { CommentCreatedPayload } from "../../Layouts/GridLayout";

type NewCommentModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  commentId: string | null;
  user: User | null;
  onCommentCreated: (payload: CommentCreatedPayload) => void;
};

export default function NewCommentOnCommentModal({
  isOpen,
  setIsOpen,
  commentId,
  user,
  onCommentCreated,
}: NewCommentModalProps) {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<CommentType | null>(null);

  useEffect(() => {
    if (!commentId) {
      return;
    }
    const getComment = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/comment/getComment/${commentId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setComment(data.comment);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getComment();
  }, [commentId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDropdownOpen = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rawContent = formData.get("content");
    const content = `Replying to @${comment!.author.username}: ${rawContent}`;

    const bodyData = {
      content,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/comment/create/${comment?.post_id}/comment/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      if (result.comment && comment?.post_id && commentId) {
        onCommentCreated({
          postId: comment.post_id,
          parentCommentId: commentId,
          comment: result.comment,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  if (!comment) {
    return;
  }
  return (
    isOpen && (
      <div className={styles.post__modal} ref={dropdownRef}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <button
            className={styles.close__btn}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            ✕
          </button>
          <div className={styles.modal__header}>
            <CommentHeader
              author={comment.author}
              comment={comment}
            ></CommentHeader>
          </div>
          <div className={styles.modal__content}>
            <CommentContent content={comment.content}></CommentContent>
          </div>
          <span className={styles.replying}>
            Replying to
            <Link to={`profile/${comment.author.id}`}>
              @{comment.author.username}
            </Link>
          </span>
          <textarea
            name="content"
            id="content"
            cols={65}
            rows={6}
            placeholder="Post your reply"
          ></textarea>
          <input type="submit" value="Post" />
          {loading && <span>Loading...</span>}
          {error && <span>{error}</span>}
        </form>
      </div>
    )
  );
}
