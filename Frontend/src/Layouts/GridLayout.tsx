import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

import { useAuth } from "../Contexts/Auth/AuthContext";

import styles from "./RootLayout.module.css";

function GridLayout() {
  const { user, logout } = useAuth();

  return (
    <section className={styles.root__layout}>
      <Navbar></Navbar>

      <main>
        <Outlet></Outlet>
      </main>
    </section>
  );
}

export default GridLayout;
