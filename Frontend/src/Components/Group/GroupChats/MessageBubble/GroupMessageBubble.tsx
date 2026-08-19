import styles from "./GroupMessageBubble.module.css";
import { TimeSent } from "../../../UI/Time/TimeSent";
import { useAuth } from "../../../../Contexts/Auth/AuthContext";

type GroupMessageBubbleTypes = {
  message: Message;
};

export const GroupMessageBubble = ({ message }: GroupMessageBubbleTypes) => {
  const { user } = useAuth();

  if (!user) {
    return <p></p>;
  }
  const isSender = message.senderId === user.id;
  const mediaUrl = message.media_url;

  const isImage = (url: string) => /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url);

  return (
    <div
      className={`${styles.bubble__row} ${isSender ? styles.sent : styles.received}`}
    >
      {!isSender && (
        <>
          <img
            src={message.sender.profile_picture_url}
            className={styles.profile__picture}
          />

          <span className={styles.username}>
            {message.sender.display_name}{" "}
            <span className={styles.display__name}>
              @{message.sender.username}
            </span>
          </span>
        </>
      )}
      <div className={styles.bubble}>
        {mediaUrl && (
          <div className={styles.media__wrapper}>
            {isImage(mediaUrl) ? (
              <img
                src={mediaUrl}
                alt="Shared attachment"
                className={styles.media__image}
                loading="lazy"
              />
            ) : isVideo(mediaUrl) ? (
              <video src={mediaUrl} controls className={styles.media__video} />
            ) : (
              <a
                href={mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.media__fallback_link}
              >
                📎 View Attached Asset
              </a>
            )}
          </div>
        )}

        <div className={styles.content__wrapper}>
          {message.content && (
            <span className={styles.text}>{message.content}</span>
          )}
          <span className={styles.time}>
            <TimeSent createTime={message.createdAt} />
          </span>
        </div>
      </div>
    </div>
  );
};
