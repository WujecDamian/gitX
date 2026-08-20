import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import UserListItem from "./subcomponents/UserListItem";
import styles from "./Follows.module.css";

type FollowsTypes = {
  id: string;
  owner: User;
};

export const FollowersModal = ({ id, owner }: FollowsTypes) => {
  const [followersList, setFollowersList] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/user/${params.userId}/followers`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setFollowersList(data.followers || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getProfile();
  }, [owner.id]);
  return (
    <div id={id} popover="auto" className={styles.modal}>
      <div className={styles.modal__content}>
        <button
          popoverTarget={id}
          popoverTargetAction="hide"
          className={styles.modal__button}
        >
          ✕
        </button>
        {followersList.length > 0 ? (
          <ul className={styles.modal__list}>
            {followersList.map((followedUser: User) => (
              <UserListItem
                key={followedUser.id}
                user={followedUser.follower}
              />
            ))}
          </ul>
        ) : (
          <span>{owner.display_name} is not followed by anyone!</span>
        )}
      </div>
    </div>
  );
};
