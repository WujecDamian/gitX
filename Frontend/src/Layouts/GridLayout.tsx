import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import SmallNavbar from "../Components/Navbar/SmallNavbar";

import { useAuth } from "../Contexts/Auth/AuthContext";
import styles from "./RootLayout.module.css";
import { useState } from "react";

import NewPostModal from "../Components/Navbar/components/NewPostModal";
import NewCommentModal from "../Components/Modals/NewCommentModal";
import NewCommentOnCommentModal from "../Components/Modals/NewCommentOnCommentModal";
import NewGroupModal from "../Components/Modals/NewGroupModal";

export type LayoutContextType = {
  setIsCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentOnCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNewGroupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setCommentPostId: React.Dispatch<React.SetStateAction<string>>;
  setCommentId: React.Dispatch<React.SetStateAction<string>>;

  commentPostId: string;
  commentId: string;
};

function GridLayout() {
  const { user, logout } = useAuth();
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isCommentOnCommentModalOpen, setIsCommentOnCommentModalOpen] =
    useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  const [commentPostId, setCommentPostId] = useState(null);
  const [commentId, setCommentId] = useState(null);

  //checking if any modal is open (for darkening background and making inactive)
  const isAnyModalOpen =
    isPostOpen ||
    isCommentModalOpen ||
    isCommentOnCommentModalOpen ||
    isNewGroupModalOpen;

  //checking on what page am I to render navbar conditionally
  const location = useLocation();
  let isOnPageWithSmallNav = false;
  if (
    location.pathname.startsWith("/chat") ||
    location.pathname.startsWith("/groups")
  ) {
    isOnPageWithSmallNav = true;
  }

  return (
    <section
      className={`${styles.root__layout} ${isOnPageWithSmallNav ? styles["root__layout--mini"] : ""}`}
    >
      {isAnyModalOpen && (
        <div
          className={styles.backdrop__overlay}
          onClick={() => {
            // Optional: Close all modals when clicking the dark background
            setIsPostOpen(false);
            setIsCommentModalOpen(false);
            setIsCommentOnCommentModalOpen(false);
            setIsNewGroupModalOpen(false);
          }}
        />
      )}
      {isOnPageWithSmallNav ? (
        <SmallNavbar onPostClick={() => setIsPostOpen(true)}></SmallNavbar>
      ) : (
        <Navbar onPostClick={() => setIsPostOpen(true)}></Navbar>
      )}
      <main>
        <Outlet
          context={{
            setIsCommentModalOpen,
            setIsCommentOnCommentModalOpen,
            setIsNewGroupModalOpen,
            setCommentPostId,
            commentPostId,
            commentId,
            setCommentId,
          }}
        ></Outlet>
        {/* Modals */}
        <NewPostModal
          isOpen={isPostOpen}
          setIsOpen={setIsPostOpen}
          user={user}
        ></NewPostModal>
        <NewCommentModal
          isOpen={isCommentModalOpen}
          setIsOpen={setIsCommentModalOpen}
          postId={commentPostId}
          user={user}
        ></NewCommentModal>
        <NewCommentOnCommentModal
          isOpen={isCommentOnCommentModalOpen}
          setIsOpen={setIsCommentOnCommentModalOpen}
          commentId={commentId}
          user={user}
        ></NewCommentOnCommentModal>
        <NewGroupModal
          isOpen={isNewGroupModalOpen}
          setIsOpen={setIsNewGroupModalOpen}
          user={user}
        ></NewGroupModal>
      </main>
    </section>
  );
}

export default GridLayout;
