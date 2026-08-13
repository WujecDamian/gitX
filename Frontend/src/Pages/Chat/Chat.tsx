import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router";
import styles from "./Chat.module.css";

function Chat() {
  const [chat, setChat] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let params = useParams();

  return (
    <>
      <section className={styles.home}>
        <h1>Chat</h1>
        <section className={styles.chat__wrapper}></section>
      </section>
    </>
  );
}

export default Chat;
