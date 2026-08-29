import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupChatListItem } from "./GroupChatListItem";
import styles from "./GroupChats.module.css";
import { API_URL } from "../../../config";
import { ErrorMessage } from "../../UI/ErrorMessage/ErrorMessage";

export const GroupChats = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const [chats, setChats] = useState<GroupChat[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [chatName, setChatName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

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

  const handleCreateChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!groupId) {
      return;
    }

    setIsCreating(true);
    setCreateError(null);

    try {
      const response = await fetch(`${API_URL}/api/chat/createGroupChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: chatName,
          groupId,
        }),
      });

      const data = await response.json();

      if (response.status === 403) {
        throw new Error(
          data.error || "Only the group creator can create chats.",
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to create chat.");
      }

      navigate(`/groups/${groupId}/chat/${data.chat.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setCreateError(err.message);
      } else {
        setCreateError("An unexpected error occurred");
      }
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading__spinner}>Loading chats...</div>;
  }

  if (error) {
    return <div className={styles.error__view}>{error}</div>;
  }

  return (
    <section className={styles.group__chats}>
      <form className={styles.new__chat} onSubmit={handleCreateChat}>
        <input
          className={styles.new__chat__input}
          type="text"
          name="chatName"
          placeholder="New chat name"
          value={chatName}
          onChange={(e) => {
            setChatName(e.target.value);
          }}
          required
        />
        <button
          className={styles.new__chat__button}
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create chat"}
        </button>
      </form>
      {createError && <ErrorMessage error={createError}></ErrorMessage>}
      {chats && chats.length > 0 ? (
        chats.map((chat) => (
          <GroupChatListItem chat={chat} key={chat.id}></GroupChatListItem>
        ))
      ) : (
        <p>No chats</p>
      )}
    </section>
  );
};
