import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserListItem from "./subcomponents/UserListItem";
import styles from "./Follows.module.css";

type FollowsTypes = {
  id: string;
  owner: User;
};

export const FollowingModal = ({ id, owner }: FollowsTypes) => {
  const [followingList, setFollowingList] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${params.userId}/following`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setFollowingList(data.following || []);
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
        {followingList.length > 0 ? (
          <ul className={styles.modal__list}>
            {followingList.map((followedUser: User) => (
              <UserListItem
                key={followedUser.id}
                user={followedUser.following}
              />
            ))}
          </ul>
        ) : (
          <span>{owner.display_name} is not following anyone!</span>
        )}
      </div>
    </div>
  );
};
