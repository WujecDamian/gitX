import { useAuth } from "../../Contexts/Auth/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NavProfile from "./components/NavProfile";

type NavbarProps = {
  onPostClick: () => void;
};

export default function Navbar({ onPostClick }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__top}>
        <div className={styles.links}>
          <Link to="/">
            {" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/250px-X_logo_2023_%28white%29.png"
              alt="GitX logo"
              className={styles.navbar__logo}
            />
          </Link>

          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/groups">Groups</Link>
          <Link to={`/profile/${user!.id}`}>Profile</Link>
          <button onClick={onPostClick}>Post</button>
        </div>
      </div>
      {user ? (
        <div>
          <NavProfile user={user} logout={logout}></NavProfile>
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
