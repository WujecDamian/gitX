import styles from "./GroupCard.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeAccountCreated } from "../../../../UI/Time/TimeAccountCreated";

import { MembersModal } from "../../../../Modals/MembersModal/MembersModal";
import { useAuth } from "../../../../../Contexts/Auth/AuthContext";
import { API_URL } from "../../../../../config";

type props = {
  group: Group;
  isMember: boolean;
};

export default function GroupCard({ group, isMember }: props) {
  const { user } = useAuth();
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();
  const [buttonContent, setButtonContent] = useState("Following");
  console.log(isMember);
  const onFollowClick = async () => {
    try {
      const response = await fetch(`${API_URL}/api/follow/group/${group.id}`, {
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
      const response = await fetch(`${API_URL}/api/chat/${group.id}`, {
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
  if (!user) {
    return "Log in first";
  }
  return (
    <section className={styles.group__wrapper}>
      <section className={styles.group__visuals}>
        <img
          src={group.group_banner_picture_url}
          alt={`${group.group_name}'s banner`}
          className={styles.banner__image}
        />
        <div className={styles.group__pfp__container}>
          <img
            src={group.group_profile_picture_url}
            alt={`${group.group_name}'s avatar`}
          />
        </div>
      </section>

      <div className={styles.action__row}>
        {user.id === group.creator_id ? (
          <button className={styles.edit__button}>Edit Group</button>
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

            {isMember ? (
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

      <section className={styles.group__details}>
        <span className={styles.group__name}>{group.group_name}</span>
        <span className={styles.bio}>{group.bio}</span>

        <div className={styles.meta__info}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M7 4V3h2v1h6V3h2v1h1.5C19.88 4 21 5.12 21 6.5v12c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm7 6h-4v-2h4v2z" />
          </svg>
          {"Created"}{" "}
          <TimeAccountCreated createTime={group.createdAt}></TimeAccountCreated>
        </div>

        <div className={styles.statsRow}>
          <button
            className={styles.members__count__button}
            popoverTarget="members-popover"
            popoverTargetAction="show"
          >
            <span>
              <strong>{group._count.members}</strong> Members
            </span>
          </button>
          <MembersModal id="members-popover" group={group}></MembersModal>
        </div>
      </section>
    </section>
  );
}
