import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import { TimeAccountCreated } from "../UI/Time/TimeAccountCreated";
import { useAuth } from "../../Contexts/Auth/AuthContext";

type props = {
  owner: User;
  posts: Post;
};

export default function ProfileCard({ owner, posts }: props) {
  const { user } = useAuth();

  return (
    <section className={styles.profile__wrapper}>
      {/* Banner & PFP Area */}
      <section className={styles.profile__visuals}>
        <img
          src={owner.banner_picture_url}
          alt={`${owner.display_name}'s banner`}
          className={styles.banner_image}
        />
        <div className={styles.pfp__container}>
          <img
            src={owner.profile_picture_url}
            alt={`${owner.display_name}'s avatar`}
          />
        </div>
      </section>

      {/* Button Action Row */}
      <div className={styles.action__row}>
        <button className={styles.edit__button}>Edit profile</button>
      </div>

      {/* Bio / Metadata Details */}
      <section className={styles.profile__details}>
        <span className={styles.display__name}>{owner.display_name}</span>
        <span className={styles.username}>@{owner.username}</span>

        <div className={styles.meta__info}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M7 4V3h2v1h6V3h2v1h1.5C19.88 4 21 5.12 21 6.5v12c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm7 6h-4v-2h4v2z" />
          </svg>
          <TimeAccountCreated createTime={owner.createdAt}></TimeAccountCreated>
        </div>

        <div className={styles.statsRow}>
          <span>
            <strong>{owner._count.following}</strong> Following
          </span>
          <span>
            <strong>{owner._count.followers}</strong> Followers
          </span>
        </div>
      </section>
    </section>
  );
}
