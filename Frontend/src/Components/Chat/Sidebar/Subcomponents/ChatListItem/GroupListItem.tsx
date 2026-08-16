import styles from "./groupListItem.module.css";
import { ProfilePicture } from "../../../../UI/ProfilePicture/ProfilePicture";
import { TimeSent } from "../../../../UI/Time/TimeSent";
import { Link } from "react-router-dom";

type GroupListItemTypes = {
  group: any;
};

export const GroupListItem = ({ group }: GroupListItemTypes) => {
  let isMessageSentByRecipient = false;
  if (group.messages[0]) {
    if (group.recipient.id === group.messages[0].senderId) {
      isMessageSentByRecipient = true;
    }
  }
  return (
    <Link to={`/group/${group.id}`} className={styles.group__list__item}>
      <div className={styles["list__item--left"]}>
        <ProfilePicture url={group.recipient.profile_picture_url} />
      </div>

      <div className={styles["list__item--right"]}>
        <div className={styles["item__right--top"]}>
          <h4 className={styles.username}>{group.recipient.display_name}</h4>
          {/* Note: Ensure TimeSent renders or wraps in a styling-friendly tag if needed */}
          {group.messages[0] && (
            <span className={styles.time_wrapper}>
              <TimeSent createTime={group.messages[0].createdAt} />
            </span>
          )}
        </div>

        <div className={styles["item__right--bottom"]}>
          <p
            className={`${styles.message_preview} ${
              isMessageSentByRecipient
                ? styles.sentMessage
                : styles.receivedMessage
            }`}
          >
            {!isMessageSentByRecipient && group.messages[0] && (
              <span className={styles.you_prefix}>You: </span>
            )}
            {group.messages[0]
              ? group.messages[0].content.length > 20
                ? `${group.messages[0].content.slice(0, 20)}...`
                : group.messages[0].content
              : "\u200B"}
          </p>
        </div>
      </div>
    </Link>
  );
};
