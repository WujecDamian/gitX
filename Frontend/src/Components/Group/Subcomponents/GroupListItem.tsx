import styles from "./groupListItem.module.css";
import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import { TimeSent } from "../../UI/Time/TimeSent";
import { Link } from "react-router-dom";

type GroupListItemTypes = {
  group: Group;
};

export const GroupListItem = ({ group }: GroupListItemTypes) => {
  return (
    <Link to={`/group/${group.id}`} className={styles.group__list__item}>
      <div className={styles["list__item--left"]}>
        <ProfilePicture url={group.group_profile_picture_url} />
      </div>

      <div className={styles["list__item--right"]}>
        <div className={styles["item__right--top"]}>
          <h4 className={styles.username}>{group.group_name}</h4>
        </div>

        <div className={styles["item__right--bottom"]}></div>
      </div>
    </Link>
  );
};
