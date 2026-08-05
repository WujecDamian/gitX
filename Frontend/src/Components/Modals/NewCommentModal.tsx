import { useState, useRef, useEffect } from "react";
import styles from "./NewCommentModal.module.css";
import { ProfilePicture } from "../UI/ProfilePicture/ProfilePicture";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../Layouts/GridLayout";
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
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      console.log("Function working and trying to fetch");
      console.log(postId);
      try {
        const response = await fetch(
          `http://localhost:3000/api/post/${postId}`,
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

  console.log(post);
  return (
    isOpen && (
      <div className={styles.post__modal} ref={dropdownRef}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <ProfilePicture url={user.profile_picture_url}></ProfilePicture>
          {/* <PostHeader author={post.author}></PostHeader>
          <PostContent></PostContent> */}
          <textarea
            name="content"
            id="content"
            cols={65}
            rows={10}
            placeholder="What's happening?"
          ></textarea>
          <input type="submit" value="Post" />
          {loading && <span>Loading...</span>}
          {error && <span>{error}</span>}
        </form>
      </div>
    )
  );
}
