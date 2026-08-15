import styles from "./RecipientProfileCard.module.css";

export const RecipientProfileCard = ({ recipient }: any) => {
  return (
    <div className={styles.profile__card}>
      <img
        src={recipient.profile_picture_url}
        alt=""
        className={styles.avatar}
      />

      <div className={styles.name__row}>
        <h2>{recipient.display_name}</h2>
        {recipient.isVerified && <span className={styles.badge}>✓</span>}
      </div>

      <p className={styles.username}>{recipient.username}</p>

      <p className={styles.meta}>
        <strong>{recipient.followers}</strong> Followers · Joined{" "}
        {recipient.joined}
      </p>

      <button className={styles.view__btn}>View Profile</button>
    </div>
  );
};
