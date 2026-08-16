import styles from "./Sidebar.module.css";
import { ChatListItem } from "./Subcomponents/ChatListItem/ChatListItem";

type SidebarTypes = {
  chats: Chat[];
};

export const Sidebar = ({ chats }: SidebarTypes) => {
  return (
    <aside className={styles.chat__sidebar}>
      <h1 className={styles.sidebar__title}>Chat</h1>

      <div className={styles.search__container}>
        <input
          type="search"
          name="recipient"
          id="recipient"
          placeholder="Search"
          className={styles.search__input}
        />
      </div>

      <ul className={styles.chat__list__item__list}>
        {chats.map((chat) => (
          <ChatListItem chat={chat} key={chat.id}></ChatListItem>
        ))}
      </ul>
    </aside>
  );
};
