import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router";
import styles from "./Chat.module.css";
import Message from "../../Components/Message/Message";

function Chat() {
  const [cookies] = useCookies(["user", "token"]);
  const token = cookies.token;
  const user = cookies.user;

  const [chat, setChat] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  let params = useParams();

  useEffect(() => {
    const fetchChat = async () => {
      console.log(params.recipientId);
      try {
        const response = await fetch(
          `http://localhost:3000/api/chats/chat/${params.recipientId}`,
          {
            method: "GET",
            headers: {
              authorization: `bearer ${token}`,
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            `HTTP error ${result.error}! Status: ${response.status}`,
          );
        }
        setChat(result.messages);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchChat();
  }, []);
  console.log(chat);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(message);
    const bodyData = {
      message,
    };
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/chats/chat/${params.recipientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ bodyData }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      setError(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.home}>
        <h1>Chat</h1>
        <section className={styles.chat__wrapper}></section>
        {loading && <span>loading....</span>}
        {error && <span>{error?.message ? error.message : String(error)}</span>}
        <section className={styles.newMessage__form}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <input type="submit" value=">" />
            {loading && <span>Loading...</span>}
            {error?.message ? error.message : String(error)}
          </form>
        </section>
        <section className={styles.messages}>
          {chat.map((message) => (
            <Message userId={user.id} message={message}></Message>
          ))}
        </section>
      </section>
    </>
  );
}

export default Chat;
