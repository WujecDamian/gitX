import { ProfilePicture } from "../../../UI/ProfilePicture/ProfilePicture";
import styles from "./RecipientHeading.module.css";

type RecipientHeadingTypes = {
  recipient: User;
};

export const RecipientHeading = ({ recipient }: RecipientHeadingTypes) => {
  return (
    <header className={styles.heading__container}>
      <div className={styles.avatar__wrapper}>
        <ProfilePicture url={recipient.profile_picture_url} />
      </div>
      <h2 className={styles.display__name}>{recipient.display_name}</h2>
    </header>
  );
};
