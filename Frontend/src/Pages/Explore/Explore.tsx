import { useEffect, useState, useRef } from "react";
import styles from "./Explore.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";

function Explore() {
  const { user } = useAuth();

  return (
    <>
      <section className={styles.explore}>
        <h1>Work in progress.</h1>
        <h4>Coming soon...</h4>
      </section>
    </>
  );
}

export default Explore;
