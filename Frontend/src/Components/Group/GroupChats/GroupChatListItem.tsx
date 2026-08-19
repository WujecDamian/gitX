import { useParams } from "react-router-dom";
import { useAuth } from "../../../Contexts/Auth/AuthContext";
import styles from "./GroupChatListItem.module.css";
import { Link } from "react-router-dom";
import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import { TimeSent } from "../../UI/Time/TimeSent";

type GroupChatListItemTypes = {
  chat: GroupChat;
};

export const GroupChatListItem = ({ chat }: GroupChatListItemTypes) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  let isMessageSentByUser = false;
  if (chat.messages[0]) {
    if (user?.id === chat.messages[0].senderId) {
      isMessageSentByUser = true;
    }
  }
  return (
    <Link
      to={`/groups/${groupId}/chat/${chat.id}`}
      className={styles.chat__list__item}
    >
      <div className={styles["list__item--left"]}>
        <ProfilePicture url={chat.picture_url} />
      </div>

      <div className={styles["list__item--right"]}>
        <div className={styles["item__right--top"]}>
          <h4 className={styles.username}>{chat.name}</h4>
          <p className={styles.message__preview}>
            {chat.messages.length > 0 && (
              <TimeSent createTime={chat.messages[0].createdAt}></TimeSent>
            )}
          </p>
        </div>

        <div className={styles["item__right--bottom"]}>
          {chat.messages.length > 0 ? (
            <p
              className={`${styles.message__preview} ${
                isMessageSentByUser
                  ? styles.sentMessage
                  : styles.receivedMessage
              }`}
            >
              {isMessageSentByUser && chat.messages[0] && (
                <span className={styles.you__prefix}>You: </span>
              )}
              {chat.messages[0]
                ? chat.messages[0].content.length > 60
                  ? `${chat.messages[0].content.slice(0, 60)}...`
                  : chat.messages[0].content
                : "\u200B"}
            </p>
          ) : (
            <p className={styles.message__preview}>
              <i>Be first to message!</i>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
