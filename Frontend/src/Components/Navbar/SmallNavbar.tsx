import { useAuth } from "../../Contexts/Auth/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SmallNavbar.module.css";
import MiniNavProfile from "./components/MiniNavProfile";

type NavbarProps = {
  onPostClick: () => void;
};

export default function SmallNavbar({ onPostClick }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__top}>
        <div className={styles.links}>
          <Link to="/" className={styles.nav__link}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/250px-X_logo_2023_%28white%29.png"
              alt="GitX logo"
              className={styles.navbar__logo}
            />
          </Link>

          <Link to="/" className={styles.nav__link}>
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2.1L3.06 9.6c-.63.53-.98 1.3-.98 2.12V20c0 1.1.9 2 2 2h5.5c.28 0 .5-.22.5-.5v-4.5c0-.83.67-1.5 1.5-1.5h1.76c.83 0 1.5.67 1.5 1.5v4.5c0 .28.22.5.5.5H19.9c1.1 0 2-.9 2-2v-8.28c0-.82-.35-1.59-.98-2.12L12 2.1z" />
            </svg>
          </Link>
          <Link to="/explore" className={styles.nav__link}>
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <Link to="/chat" className={styles.nav__link}>
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Link>
          <Link to="/groups" className={styles.nav__link}>
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </Link>
          <Link to={`/profile/${user!.id}`} className={styles.nav__link}>
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <button onClick={onPostClick}>
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>
      {user ? (
        <div>
          <MiniNavProfile user={user} logout={logout}></MiniNavProfile>
        </div>
      ) : (
        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:3000/api/auth/login/github")
          }
        >
          Login with GitHub
        </button>
      )}
    </nav>
  );
}
