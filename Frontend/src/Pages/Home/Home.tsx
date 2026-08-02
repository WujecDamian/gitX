import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";

function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading your dashboard...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  return (
    <>
      <p>{user.username}</p>
      <section className={styles.home}>
        <h1>Check out some group!</h1>

        <section className={styles.groups}></section>
      </section>
    </>
  );
}

export default Home;
