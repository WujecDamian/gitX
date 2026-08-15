import styles from "./MessageBubble.module.css";
import { TimeSent } from "../../../UI/Time/TimeSent";

export const MessageBubble = ({ message }: any) => {
  return (
    <div
      className={`${styles.bubble__row} ${message.isSender ? styles.sent : styles.received}`}
    >
      <div className={styles.bubble}>
        <span className={styles.text}>{message.content}</span>
        <span className={styles.time}>
          <TimeSent createTime={message.createdAt}></TimeSent>
        </span>
      </div>
    </div>
  );
};
