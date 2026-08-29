import { useEffect, useState } from "react";
import styles from "./Explore.module.css";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";
import UserListItem from "../../Components/Modals/FollowsModal/subcomponents/UserListItem";

function Explore() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length === 0) {
      setUsers([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/user/search?query=${encodeURIComponent(trimmed)}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to search users");
        }

        if (!cancelled) {
          setUsers(data.users || []);
          setError(null);
        }
      } catch (error) {
        if (!cancelled) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred");
          }
          setUsers([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <section className={styles.explore}>
      <h1 className={styles.explore__title}>Explore</h1>
      <input
        className={styles.explore__search}
        type="search"
        name="q"
        placeholder="Search people"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {error && <ErrorMessage error={error}></ErrorMessage>}
      {query.trim().length === 0 && (
        <p className={styles.explore__hint}>Type to find people.</p>
      )}
      {isLoading && query.trim().length > 0 && (
        <p className={styles.explore__hint}>Searching...</p>
      )}
      {!isLoading && query.trim().length > 0 && users.length === 0 && !error && (
        <p className={styles.explore__hint}>No people match that search.</p>
      )}
      <ul className={styles.explore__results}>
        {users.map((user) => (
          <li key={user.id}>
            <UserListItem user={user}></UserListItem>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Explore;
