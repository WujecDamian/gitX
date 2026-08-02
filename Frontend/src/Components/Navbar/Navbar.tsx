import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, removeCookie] = useCookies(["user", "token"]);

  const token = cookies.token;
  const user = cookies.user;
  if (user !== "undefined") {
    console.log("User is logged in! ", user);
  }

  const handleLogout = async () => {
    removeCookie("token", { path: "/" });
    removeCookie("user");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/">Home</Link>
        {user !== "undefined" ? (
          <Link onClick={handleLogout}>Log out</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </>
  );
}
export default Navbar;
