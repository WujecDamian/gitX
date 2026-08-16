import { useState, useRef, useEffect } from "react";
import styles from "./NewGroupModal.module.css";
import { ProfilePicture } from "../UI/ProfilePicture/ProfilePicture";

type NewGroupModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User;
};

export default function NewGroupModal({
  isOpen,
  setIsOpen,
  user,
}: NewGroupModalProps) {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.target);
      console.log("DropdownRef", dropdownRef.current);
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("closed");
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDropdownOpen = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const groupName = formData.get("groupName");

    const bodyData = {
      groupName,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/group/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
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
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <div className={styles.group__modal} ref={dropdownRef}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <button
            className={styles.close__btn}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            ✕
          </button>
          <div className={styles.modal__wrapper}>
            <h2>
              You're creating new group as{" "}
              <i className={styles.group__header__text}>{user.display_name}</i>
            </h2>
            <textarea
              name="groupName"
              id="groupName"
              cols={6}
              rows={10}
              placeholder="Group Name"
            ></textarea>
          </div>

          <input type="submit" value="Create" />
          {loading && <span>Loading...</span>}
          {error && <span>{error}</span>}
        </form>
      </div>
    )
  );
}
