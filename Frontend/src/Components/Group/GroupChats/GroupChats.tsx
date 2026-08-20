import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupChatListItem } from "./GroupChatListItem";
import styles from "./GroupChats.module.css";
import { API_URL } from "../../../config";

export const GroupChats = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const [chats, setChats] = useState<GroupChat[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) {
      setChats(null);
      return;
    }

    const fetchChatHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/group/${groupId}/chats`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to load conversation history.");
        }
        const data = await response.json();
        setChats(data.chats.groupChats);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [groupId]);
  console.log(chats);

  if (isLoading) {
    return <div className={styles.loading__spinner}>Loading chats...</div>;
  }

  if (error) {
    return <div className={styles.error__view}>{error}</div>;
  }
  return (
    <section className={styles.group__chats}>
      {chats ? (
        chats.map((chat) => (
          <GroupChatListItem chat={chat} key={chat.id}></GroupChatListItem>
        ))
      ) : (
        <p>No chats</p>
      )}
    </section>
  );
};
