import { ProfilePicture } from "../../../UI/ProfilePicture/ProfilePicture";
import styles from "./UserListItem.module.css";
import { Link } from "react-router-dom";

type UserListItemTypes = {
  user: User;
};

export default function UserListItem({ user }: UserListItemTypes) {
  return (
    <>
      <Link to={`/profile/${user.id}`} className={styles.profile__header}>
        <ProfilePicture url={user.profile_picture_url}></ProfilePicture>
        <div className={styles.profile__header__text__wrapper}>
          <div className={styles.profile__header__upper}>
            {" "}
            <h3 className={styles.user__name}>{user.display_name}</h3>
            <span className="separator" aria-hidden="true">
              •
            </span>
            <div className={styles.user__followers}>
              <h3>{user._count.followers}</h3>
              <h3>Followers</h3>
            </div>
          </div>
          <span className="user__handle">@{user.username}</span>
        </div>
      </Link>
    </>
  );
}
