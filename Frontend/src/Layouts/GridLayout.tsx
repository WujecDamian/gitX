import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

import { useAuth } from "../Contexts/Auth/AuthContext";
import styles from "./RootLayout.module.css";
import { useState } from "react";

import NewPostModal from "../Components/Navbar/components/NewPostModal";
import NewCommentModal from "../Components/Modals/NewCommentModal";
import NewCommentOnCommentModal from "../Components/Modals/NewCommentOnCommentModal";

export type LayoutContextType = {
  setIsCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentOnCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

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
  const [commentPostId, setCommentPostId] = useState(null);
  const [commentId, setCommentId] = useState(null);

  //checking if any modal is open (for darkening background and making inactive)
  const isAnyModalOpen =
    isPostOpen || isCommentModalOpen || isCommentOnCommentModalOpen;

  return (
    <section className={styles.root__layout}>
      {isAnyModalOpen && (
        <div
          className={styles.backdrop__overlay}
          onClick={() => {
            // Optional: Close all modals when clicking the dark background
            setIsPostOpen(false);
            setIsCommentModalOpen(false);
            setIsCommentOnCommentModalOpen(false);
          }}
        />
      )}
      <Navbar onPostClick={() => setIsPostOpen(true)}></Navbar>

      <main>
        <Outlet
          context={{
            setIsCommentModalOpen,
            setIsCommentOnCommentModalOpen,
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
      </main>
    </section>
  );
}

export default GridLayout;
