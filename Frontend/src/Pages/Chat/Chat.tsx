import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router";
import styles from "./Chat.module.css";
import { Sidebar } from "../../Components/Chat/Sidebar/Sidebar";
import { Conversation } from "../../Components/Chat/Conversation/Conversation";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";

function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let params = useParams();
  if (!user) {
    return <h2>Log in first</h2>;
  }
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/chat/getChats/`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch chats: ${response.statusText}`);
        }
        const data = await response.json();
        setChats(data.chats);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getChats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;
  if (error) return <ErrorMessage error={error}></ErrorMessage>;
  console.log(chats);
  return (
    <>
      <section className={styles.chat__wrapper}>
        <Sidebar chats={chats}></Sidebar>
        <Conversation></Conversation>
      </section>
    </>
  );
}

export default Chat;
