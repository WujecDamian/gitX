import styles from "./GroupSidebar.module.css";
import { GroupListItem } from "./Subcomponents/ChatListItem/GroupListItem";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../../Layouts/GridLayout";

type GroupSidebarTypes = {
  groups: any;
};

export const GroupSidebar = ({ groups }: GroupSidebarTypes) => {
  const { setIsNewGroupModalOpen } = useOutletContext<LayoutContextType>();
  return (
    <aside className={styles.group__sidebar}>
      <div className={styles.heading__container}>
        <h1 className={styles.sidebar__title}>Groups</h1>

        <button
          type="button"
          name="newGroup"
          id="newGroup"
          className={styles.new__group__button}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsNewGroupModalOpen(true);
          }}
        >
          <svg
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2" />
            <circle cx="8" cy="7" r="4" />

            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M15 3.13a4 4 0 0 1 0 7.75" />

            <path d="M19 4h4M21 2v4" />
          </svg>
        </button>
      </div>
      <div className={styles.search__container}>
        <input
          type="search"
          name="recipient"
          id="recipient"
          placeholder="Search"
          className={styles.search__input}
        />
      </div>

      <ul className={styles.group__list__item__list}>
        {groups.map((group) => (
          <GroupListItem group={group} key={group.id}></GroupListItem>
        ))}
      </ul>
    </aside>
  );
};
