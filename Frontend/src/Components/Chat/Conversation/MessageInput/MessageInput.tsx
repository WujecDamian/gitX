import styles from "./MessageInput.module.css";
import { useState } from "react";

type MessageInputTypes = {
  chatId: string;
};

export const MessageInput = ({ chatId }: MessageInputTypes) => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/chat/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            chatId,
            content: text.trim(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Pass the returned message object up to the parent array state
      setText(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer className={styles.input__footer}>
      <button type="button" className={styles.icon__btn}>
        ＋
      </button>

      <form className={styles.input__form} onSubmit={handleSubmit}>
        <div className={styles.input__container}>
          <input
            type="text"
            placeholder="Unencrypted message"
            className={styles.text__input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSending}
          />

          {/* Send Button visible only when there is text typed */}
          {text.trim() && (
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
