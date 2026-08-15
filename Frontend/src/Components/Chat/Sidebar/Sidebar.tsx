import styles from "./Sidebar.module.css";

type SidebarTypes = {
  chats: any;
};

export const Sidebar = ({ chats }: SidebarTypes) => {
  return (
    <aside className={styles.chat__sidebar}>
      <p>Chat</p>
      <input type="search" name="recipient" id="recipient" />
    </aside>
  );
};
