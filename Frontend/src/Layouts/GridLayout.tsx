import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import SmallNavbar from "../Components/Navbar/SmallNavbar";

import { useAuth } from "../Contexts/Auth/AuthContext";
import styles from "./RootLayout.module.css";
import { useCallback, useRef, useState } from "react";

import NewPostModal from "../Components/Navbar/components/NewPostModal";
import NewCommentModal from "../Components/Modals/NewCommentModal";
import NewCommentOnCommentModal from "../Components/Modals/NewCommentOnCommentModal";
import NewGroupModal from "../Components/Modals/NewGroupModal";

export type CommentCreatedPayload = {
  postId: string;
  parentCommentId?: string;
  comment: CommentType;
};

export type PostCreatedPayload = {
  post: Post;
};

export type LayoutContextType = {
  setIsCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentOnCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNewGroupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setCommentPostId: React.Dispatch<React.SetStateAction<string>>;
  setCommentId: React.Dispatch<React.SetStateAction<string>>;

  commentPostId: string;
  commentId: string;
  setOnCommentCreated: (
    handler: ((payload: CommentCreatedPayload) => void) | null,
  ) => void;
  setOnPostCreated: (
    handler: ((payload: PostCreatedPayload) => void) | null,
  ) => void;
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
  const onCommentCreatedRef = useRef<
    ((payload: CommentCreatedPayload) => void) | null
  >(null);
  const onPostCreatedRef = useRef<
    ((payload: PostCreatedPayload) => void) | null
  >(null);

  const setOnCommentCreated = useCallback(
    (handler: ((payload: CommentCreatedPayload) => void) | null) => {
      onCommentCreatedRef.current = handler;
    },
    [],
  );

  const setOnPostCreated = useCallback(
    (handler: ((payload: PostCreatedPayload) => void) | null) => {
      onPostCreatedRef.current = handler;
    },
    [],
  );

  const notifyCommentCreated = (payload: CommentCreatedPayload) => {
    onCommentCreatedRef.current?.(payload);
  };

  const notifyPostCreated = (payload: PostCreatedPayload) => {
    onPostCreatedRef.current?.(payload);
  };

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
      <main className={styles.root__main}>
        <Outlet
          context={{
            setIsCommentModalOpen,
            setIsCommentOnCommentModalOpen,
            setIsNewGroupModalOpen,
            setCommentPostId,
            commentPostId,
            commentId,
            setCommentId,
            setOnCommentCreated,
            setOnPostCreated,
          }}
        ></Outlet>
        {/* Modals */}
        <NewPostModal
          isOpen={isPostOpen}
          setIsOpen={setIsPostOpen}
          user={user}
          onPostCreated={notifyPostCreated}
        ></NewPostModal>
        <NewCommentModal
          isOpen={isCommentModalOpen}
          setIsOpen={setIsCommentModalOpen}
          postId={commentPostId}
          user={user}
          onCommentCreated={notifyCommentCreated}
        ></NewCommentModal>
        <NewCommentOnCommentModal
          isOpen={isCommentOnCommentModalOpen}
          setIsOpen={setIsCommentOnCommentModalOpen}
          commentId={commentId}
          user={user}
          onCommentCreated={notifyCommentCreated}
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
