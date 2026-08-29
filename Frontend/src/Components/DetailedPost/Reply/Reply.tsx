import styles from "./Reply.module.css";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import { API_URL } from "../../../config";

type props = {
  author: User;
  postId: string;
  onCommentCreated: (comment: CommentType) => void;
};
export default function Reply(props: props) {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const content = formData.get("content");

    const bodyData = {
      content,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/comment/create/${props.postId}`,
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

      if (result.comment) {
        props.onCommentCreated(result.comment);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setContent("");
    }
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };
  return (
    <div className={styles.reply}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <ProfilePicture url={props.author.profile_picture_url}></ProfilePicture>
        <textarea
          name="content"
          id="content"
          rows={1}
          placeholder="Post your reply"
          value={content}
          ref={textareaRef}
          onChange={handleInputChange}
        ></textarea>
        <input type="submit" value="Post" />
        {loading && <span>Loading...</span>}
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}
