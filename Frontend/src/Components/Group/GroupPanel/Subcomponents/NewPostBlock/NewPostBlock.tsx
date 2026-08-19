import styles from "./NewPostBlock.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../../../Contexts/Auth/AuthContext";
import { ProfilePicture } from "../../../../UI/ProfilePicture/ProfilePicture";

export type TabOption = "Posts" | "Chat";

export const NewPostBlock = () => {
  const { user } = useAuth();
  const { groupId } = useParams<{ groupId: string }>();
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const bodyData = {
      content,
      groupId,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/post/create/`, {
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
      setContent("");
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
