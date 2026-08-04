import styles from "./ProfilePicture.module.css";

type ProfilePictureTypes = {
  url: string;
};

export const ProfilePicture = ({ url }: ProfilePictureTypes) => {
  return <img src={url} alt="" className={styles.profile__img} />;
};
