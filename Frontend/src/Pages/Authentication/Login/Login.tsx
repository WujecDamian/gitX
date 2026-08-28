import styles from "./Login.module.css";
import { API_URL } from "../../../config";

const Login = () => {
  //const API_BASE_URL = import.meta.env.VITE_API_URL || "${API_URL}";

  const handleLogin = () => {
    window.location.href = `${API_URL}/api/auth/login/github`;
  };

  const handleGuestLogin = () => {
    window.location.href = `${API_URL}/api/auth/login/guest`;
  };

  return (
    <main className={styles.login__main}>
      <section className={styles.main__left}>
        <h1>Code Connects.</h1>
        <div className={styles.buttons}>
          <button onClick={handleLogin}>Continue with GitHub</button>
          <button onClick={handleGuestLogin}>Continue as Guest</button>
        </div>
        <p>
          By continuing, you agree to our Terms of Service, Privacy Policy and
          Cookie Use.
        </p>
      </section>
      <section className={styles.main__right}>
        <img src="/X_logo.png" alt="GitX logo" />
      </section>
    </main>
  );
};

export default Login;
