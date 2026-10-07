import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Contexts/Auth/AuthContext";
import styles from "./ProtectedRoute.module.css";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.wakeup}>
        <div className={styles.wakeup__card}>
          <h1 className={styles.wakeup__title}>The server is waking up</h1>
          <p className={styles.wakeup__text}>
            This app runs on a free hosting plan. After a longer stretch of
            inactivity it goes to sleep. It is starting now, which can take up
            to a minute. Thanks for waiting.
          </p>
          <svg xmlns="http://w3.org" viewBox="0 0 50 50" width="50" height="50">
            <circle
              className={styles.spinner}
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            ></circle>
            <circle
              className={styles.path}
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            ></circle>
          </svg>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRoute;
