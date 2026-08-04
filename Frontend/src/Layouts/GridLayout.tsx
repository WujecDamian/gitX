import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

import { useAuth } from "../Contexts/Auth/AuthContext";
import styles from "./RootLayout.module.css";
import { useState } from "react";

import NewPostModal from "../Components/Navbar/components/NewPostModal";

function GridLayout() {
  const { user, logout } = useAuth();
  const [isPostOpen, setIsPostOpen] = useState(false);

  return (
    <section className={styles.root__layout}>
      <Navbar onPostClick={() => setIsPostOpen(true)}></Navbar>

      <main>
        <Outlet></Outlet>
        {/* Modals */}
        <NewPostModal
          isOpen={isPostOpen}
          setIsOpen={setIsPostOpen}
          user={user}
        ></NewPostModal>
      </main>
    </section>
  );
}

export default GridLayout;
