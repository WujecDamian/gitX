import styles from "./Sidebar.module.css";
import { ChatListItem } from "./Subcomponents/ChatListItem/ChatListItem";

type SidebarTypes = {
  chats: Chat[];
};

export const Sidebar = ({ chats }: SidebarTypes) => {
  return (
    <aside className={styles.chat__sidebar}>
      <p>Chat</p>
      <input type="search" name="recipient" id="recipient" />
      <ul className={styles.chat__list__item__list}>
        {chats.map((chat) => (
          <ChatListItem chat={chat} key={chat.id}></ChatListItem>
        ))}
      </ul>
    </aside>
  );
};
