import styles from "./ProfileCard.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeAccountCreated } from "../UI/Time/TimeAccountCreated";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { API_URL } from "../../config";

import { FollowingModal } from "../Modals/FollowsModal/FollowingModal";
import { FollowersModal } from "../Modals/FollowsModal/FollowersModal";
import { EditProfileModal } from "../Modals/EditProfileModal/EditProfileModal";

type props = {
  owner: User;
  isFollowing: boolean;
  onProfileUpdated: () => Promise<void> | void;
};

export default function ProfileCard({
  owner,
  isFollowing,
  onProfileUpdated,
}: props) {
  const [error, setError] = useState<String | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [buttonContent, setButtonContent] = useState("Following");
  console.log(isFollowing);
  const onFollowClick = async () => {
    try {
      const response = await fetch(`${API_URL}/api/follow/user/${owner.id}`, {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  const onMessageClick = async () => {
    // 1. get chat id using getorcreate api route.
    // 2. redirect to chat
    let chatId = "";
    try {
      const response = await fetch(`${API_URL}/api/chat/${owner.id}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Something went wrong");
      }
      const data = await response.json();
      chatId = data.chat;
      navigate(`/chat/${chatId}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <section className={styles.profile__wrapper}>
      <section className={styles.profile__visuals}>
        <img
          src={owner.banner_picture_url}
          alt={`${owner.display_name}'s banner`}
          className={styles.banner__image}
        />
        <div className={styles.pfp__container}>
          <img
            src={owner.profile_picture_url}
            alt={`${owner.display_name}'s avatar`}
          />
        </div>
      </section>

      <div className={styles.action__row}>
        {owner.id === user?.id ? (
          <button
            className={styles.edit__button}
            onClick={() => setIsEditOpen(true)}
          >
            Edit profile
          </button>
        ) : (
          <>
            <button className={styles.message__button} onClick={onMessageClick}>
              <svg
                xmlns="http://w3.org"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </button>

            {isFollowing ? (
              <button
                className={styles.following__button}
                onClick={onFollowClick}
                onMouseOver={() => setButtonContent("Unfollow")}
                onMouseLeave={() => setButtonContent("Following")}
              >
                {buttonContent}
              </button>
            ) : (
              <button className={styles.follow__button} onClick={onFollowClick}>
                Follow
              </button>
            )}
          </>
        )}
      </div>

      <section className={styles.profile__details}>
        <span className={styles.display__name}>{owner.display_name}</span>
        <span className={styles.username}>@{owner.username}</span>
        <span className={styles.bio}>{owner.bio}</span>

        {owner.tags && owner.tags.length > 0 && (
          <div className={styles.tags}>
            {owner.tags.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {owner.socials && owner.socials.length > 0 && (
          <div className={styles.socials}>
            {owner.socials.map((social) =>
              social.startsWith("http") ? (
                <a
                  className={styles.social}
                  href={social}
                  key={social}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social}
                </a>
              ) : (
                <span className={styles.social} key={social}>
                  {social}
                </span>
              ),
            )}
          </div>
        )}

        <div className={styles.meta__info}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M7 4V3h2v1h6V3h2v1h1.5C19.88 4 21 5.12 21 6.5v12c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm7 6h-4v-2h4v2z" />
          </svg>
          {"Joined "}
          <TimeAccountCreated createTime={owner.createdAt}></TimeAccountCreated>
        </div>

        <div className={styles.statsRow}>
          <button
            className={styles.follower__count__button}
            popoverTarget="following-popover"
            popoverTargetAction="show"
          >
            <span>
              <strong>{owner._count.following}</strong> Following
            </span>
          </button>
          <FollowingModal id="following-popover" owner={owner}></FollowingModal>

          <button
            className={styles.follower__count__button}
            popoverTarget="followers-popover"
            popoverTargetAction="show"
          >
            <span>
              <strong>{owner._count.followers}</strong> Followers
            </span>
          </button>
          <FollowersModal id="followers-popover" owner={owner}></FollowersModal>
        </div>
      </section>
      {owner.id === user?.id && (
        <EditProfileModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          owner={owner}
          onProfileUpdated={onProfileUpdated}
        ></EditProfileModal>
      )}
    </section>
  );
}
