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
