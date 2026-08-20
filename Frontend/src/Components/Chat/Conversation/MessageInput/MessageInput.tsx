import styles from "./MessageInput.module.css";
import React, { useState } from "react";
import { API_URL } from "../../../../config";

type MessageInputTypes = {
  chatId: string;
};

export const MessageInput = ({ chatId }: MessageInputTypes) => {
  const [text, setText] = useState("");
  const [mediaUrl, setMediaUrl] = useState(""); // Track the media input value
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((!text.trim() && !mediaUrl.trim()) || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch(`${API_URL}/api/chat/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          chatId,
          content: text.trim(),
          mediaUrl: mediaUrl.trim() || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setText("");
      setMediaUrl("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer className={styles.input__footer}>
      <button
        type="button"
        className={styles.icon__btn}
        popoverTarget="media-popover"
      >
        ＋
      </button>

      <div id="media-popover" popover="auto" className={styles.popover__menu}>
        <p className={styles.popover__title}>Attach Media Link</p>
        <input
          type="url"
          placeholder="Paste image or video URL..."
          className={styles.popover__input}
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
        {mediaUrl.trim() && (
          <div className={styles.popover__preview_indicator}>
            ✓ Link attached
          </div>
        )}
      </div>

      <form className={styles.input__form} onSubmit={handleSubmit}>
        <div className={styles.input__container}>
          <input
            type="text"
            placeholder={
              mediaUrl ? "Message with attachment..." : "Unencrypted message"
            }
            className={styles.text__input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSending}
          />

          {(text.trim() || mediaUrl.trim()) && (
            <button
              type="submit"
              className={styles.send__button}
              disabled={isSending}
            >
              ➔
            </button>
          )}
        </div>
      </form>
    </footer>
  );
};
