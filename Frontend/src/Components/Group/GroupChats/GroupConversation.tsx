import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipientHeading } from "./Heading/RecipientHeading";
import { RecipientProfileCard } from "./RecipientProfileCard/RecipientProfileCard";
import { MessageBubble } from "./MessageBubble/MessageBubble";
import { MessageInput } from "./MessageInput/MessageInput";
import styles from "./GroupConversation.module.css";

export const GroupConversation = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId) {
      setChat(null);
      return;
    }

    const fetchChatHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/chat/getGroupChat/${chatId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to load conversation history.");
        }
        const data = await response.json();
        setChat(data.chat);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [chatId]);
  console.log(chat);
  if (!chatId) {
    return (
      <section className={styles.no__chat__selected}>
        <p>Select a message from your inbox to start chatting.</p>
      </section>
    );
  }

  if (isLoading) {
    return <div className={styles.loading__spinner}>Loading messages...</div>;
  }

  if (error) {
    return <div className={styles.error__view}>{error}</div>;
  }

  return (
    <section className={styles.conversation__wrapper}>
      {chat && (
        <>
          {/* <RecipientHeading recipient={chat.recipient} /> */}

          <div className={styles.chat__body}>
            {/*  <RecipientProfileCard recipient={chat.recipient} /> */}

            <div className={styles.messages__list}>
              {chat.messages?.map((msg: any) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </div>
          </div>

          <MessageInput chatId={chatId} />
        </>
      )}
    </section>
  );
};
