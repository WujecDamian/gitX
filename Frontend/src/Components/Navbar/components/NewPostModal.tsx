import { useState, useRef, useEffect } from "react";
import type { RefObject } from "react";
import styles from "./NewPostModal.module.css";
import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";

type NewPostModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User;
};

export default function NewPostModal({
  isOpen,
  setIsOpen,
  user,
}: NewPostModalProps) {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
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
      const response = await fetch(`${API_URL}/api/post/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
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
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

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
          <div className={styles.modal__wrapper}>
            <ProfilePicture url={user.profile_picture_url}></ProfilePicture>
            <textarea
              name="content"
              id="content"
              cols={65}
              rows={10}
              placeholder="What's happening?"
            ></textarea>
          </div>

          <input type="submit" value="Post" />
          {loading && <span>Loading...</span>}
          {error && <span>{error}</span>}
        </form>
      </div>
    )
  );
}
