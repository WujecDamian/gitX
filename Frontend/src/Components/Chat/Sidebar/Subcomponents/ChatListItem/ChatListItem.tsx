import styles from "./ChatListItem.module.css";
import { ProfilePicture } from "../../../../UI/ProfilePicture/ProfilePicture";
import { TimeSent } from "../../../../UI/Time/TimeSent";
import { Link } from "react-router-dom";

type ChatListItemTypes = {
  chat: Chat;
};

export const ChatListItem = ({ chat }: ChatListItemTypes) => {
  let isMessageSentByRecipient = false;
  if (chat.recipient.id === chat.messages[0].senderId) {
    isMessageSentByRecipient = true;
  }
  return (
    <Link to={`/chat/${chat.id}`} className={styles.chat__list__item}>
      <div className={styles["list__item--left"]}>
        <ProfilePicture url={chat.recipient.profile_picture_url} />
      </div>

      <div className={styles["list__item--right"]}>
        <div className={styles["item__right--top"]}>
          <h4 className={styles.username}>{chat.recipient.display_name}</h4>
          {/* Note: Ensure TimeSent renders or wraps in a styling-friendly tag if needed */}
          <span className={styles.time_wrapper}>
            <TimeSent createTime={chat.messages[0].createdAt} />
          </span>
        </div>

        <div className={styles["item__right--bottom"]}>
          <p
            className={`${styles.message_preview} ${
              isMessageSentByRecipient
                ? styles.sentMessage
                : styles.receivedMessage
            }`}
          >
            {isMessageSentByRecipient && (
              <span className={styles.you_prefix}>You: </span>
            )}
            {chat.messages[0].content.length > 20
              ? `${chat.messages[0].content.slice(0, 20)}...`
              : chat.messages[0].content}
          </p>
        </div>
      </div>
    </Link>
  );
};
