import { useParams } from "react-router-dom";
import styles from "./GroupChat.module.css";
import { Link } from "react-router-dom";
import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import { TimeSent } from "../../UI/Time/TimeSent";

type GroupChatTypes = {
  chat: GroupChat;
};

export const GroupChat = ({ chat }: GroupChatTypes) => {
  const { groupId } = useParams<{ groupId: string }>();

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
          <p className={styles.members__preview}>
            {chat.messages.length > 0 && (
              <TimeSent createTime={chat.messages[0].createdAt}></TimeSent>
            )}
          </p>
        </div>

        <div className={styles["item__right--bottom"]}>
          {chat.messages.length > 0 ? (
            <p className={styles.members__preview}>
              {chat.messages[0].content}
            </p>
          ) : (
            <p className={styles.members__preview}>
              <i>Be first to message!</i>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
