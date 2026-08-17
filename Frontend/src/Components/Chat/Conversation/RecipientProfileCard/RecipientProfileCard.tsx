import { Link } from "react-router-dom";
import styles from "./RecipientProfileCard.module.css";

type RecipientProfileCardTypes = {
  recipient: User;
};

export const RecipientProfileCard = ({
  recipient,
}: RecipientProfileCardTypes) => {
  console.log(recipient);
  return (
    <div className={styles.profile__card}>
      <img
        src={recipient.profile_picture_url}
        alt=""
        className={styles.avatar}
      />

      <div className={styles.name__row}>
        <h2>{recipient.display_name}</h2>
      </div>

      <p className={styles.username}>{recipient.username}</p>

      <Link to={`/profile/${recipient.id}`} className={styles.view__btn}>
        View Profile
      </Link>
    </div>
  );
};
