import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

import { useAuth } from "../Contexts/Auth/AuthContext";
import styles from "./RootLayout.module.css";
import { useState } from "react";

import NewPostModal from "../Components/Navbar/components/NewPostModal";
import NewCommentModal from "../Components/Modals/NewCommentModal";

export type LayoutContextType = {
  setIsCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentPostId: React.Dispatch<React.SetStateAction<string>>;
  commentPostId: string;
};

function GridLayout() {
  const { user, logout } = useAuth();
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentPostId, setCommentPostId] = useState(null);

  return (
    <section className={styles.root__layout}>
      <Navbar onPostClick={() => setIsPostOpen(true)}></Navbar>

      <main>
        <Outlet
          context={{ setIsCommentModalOpen, setCommentPostId, commentPostId }}
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
      </main>
    </section>
  );
}

export default GridLayout;
