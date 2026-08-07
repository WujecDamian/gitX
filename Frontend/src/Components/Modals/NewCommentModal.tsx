import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NewCommentModal.module.css";
import PostHeader from "../Post/subcomponents/PostHeader";
import PostContent from "../Post/subcomponents/PostContent";

type NewCommentModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postId: string;
  user: User;
};

export default function NewCommentModal({
  isOpen,
  setIsOpen,
  postId,
  user,
}: NewCommentModalProps) {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/post/getPost/${postId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getPost();
  }, [postId]);
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
    const content = formData.get("content");

    const bodyData = {
      content,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/comment/create/${postId}`,
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

  if (!post) {
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
            <PostHeader author={post.author} post={post}></PostHeader>
          </div>
          <div className={styles.modal__content}>
            <PostContent content={post.content}></PostContent>
          </div>
          <span className={styles.replying}>
            Replying to
            <Link to={`profile/${post.author.id}`}>
              @{post.author.username}
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
