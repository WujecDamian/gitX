import { useState, useRef, useEffect } from "react";
import styles from "./NewCommentOnComment.module.css";
import CommentHeader from "../DetailedPost/Comment/subcomponents/CommentHeader";
import CommentContent from "../DetailedPost/Comment/subcomponents/CommentContent";

type NewCommentModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  commentId: string;
  user: User;
};

export default function NewCommentOnCommentModal({
  isOpen,
  setIsOpen,
  commentId,
  user,
}: NewCommentModalProps) {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<CommentType | null>(null);

  useEffect(() => {
    const getComment = async () => {
      console.log("! ! ! CommentId: ", commentId);
      try {
        const response = await fetch(
          `http://localhost:3000/api/comment/getComment/${commentId}`,
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
  console.log(commentId);
  console.log(comment);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.target);
      console.log("DropdownRef", dropdownRef.current);
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("closed");
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
    const content = formData.get("content");

    const bodyData = {
      content,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/comment/create/${comment?.post_id}/comment/${commentId}`,
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
          <CommentHeader
            author={comment.author}
            comment={comment}
          ></CommentHeader>
          <CommentContent content={comment.content}></CommentContent>
          <textarea
            name="content"
            id="content"
            cols={65}
            rows={10}
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
