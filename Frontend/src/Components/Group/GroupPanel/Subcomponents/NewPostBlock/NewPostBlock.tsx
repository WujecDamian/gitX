import styles from "./NewPostBlock.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../../../Contexts/Auth/AuthContext";
import { ProfilePicture } from "../../../../UI/ProfilePicture/ProfilePicture";
import { API_URL } from "../../../../../config";

export type TabOption = "Posts" | "Chat";

type NewPostBlockProps = {
  onPostCreated: (post: Post) => void;
};

export const NewPostBlock = ({ onPostCreated }: NewPostBlockProps) => {
  const { user } = useAuth();
  const { groupId } = useParams<{ groupId: string }>();
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError("Post content is required");
      return;
    }

    const bodyData = {
      content: trimmedContent,
      groupId,
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

      if (result.post) {
        onPostCreated(result.post);
      }

      setContent("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.post__modal}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.modal__wrapper}>
          <ProfilePicture url={user!.profile_picture_url}></ProfilePicture>
          <textarea
            name="content"
            id="content"
            cols={65}
            rows={10}
            placeholder="Share something with the crew..."
            value={content}
            required
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>

        <input type="submit" value="Post" />
        {loading && <span>Loading...</span>}
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};
