import styles from "./GroupPanel.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const GroupPanel = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) {
      setGroup(null);
      return;
    }

    const fetchGroup = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/group/${groupId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to load conversation history.");
        }
        const data = await response.json();
        setGroup(data.group);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);
  if (!groupId) {
    return (
      <section className={styles.no__group__selected}>
        <p>Select a message from your inbox to start groupting.</p>
      </section>
    );
  }

  if (isLoading) {
    return <div className={styles.loading__spinner}>Loading messages...</div>;
  }

  if (error) {
    return <div className={styles.error__view}>{error}</div>;
  }

  console.log("GroupPanel | Group: ", group);
  return (
    <section className={styles.conversation__wrapper}>
      {group && <h1>Group info</h1>}
    </section>
  );
};
