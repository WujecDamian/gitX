import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserListItem from "./subcomponents/UserListItem";
import styles from "./MembersModal.module.css";

type MembersTypes = {
  id: string;
  group: Group;
};

export const MembersModal = ({ id, group }: MembersTypes) => {
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/group/${params.groupId}/members`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setGroupMembers(data.members.members || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getGroupMembers();
  }, [group.id]);
  console.log(groupMembers);
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
        {groupMembers.length > 0 ? (
          <ul className={styles.modal__list}>
            {groupMembers.map((member: User) => (
              <UserListItem key={member.id} user={member} />
            ))}
          </ul>
        ) : (
          <span>{group.group_name} Has no members!</span>
        )}
      </div>
    </div>
  );
};
