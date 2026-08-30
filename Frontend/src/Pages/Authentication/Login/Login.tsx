import styles from "./Login.module.css";
import { API_URL } from "../../../config";
import { Button } from "../../../Components/UI/Button/Button";

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/api/auth/login/github`;
  };

  const handleGuestLogin = () => {
    window.location.href = `${API_URL}/api/auth/login/guest`;
  };

  return (
    <main className={styles.login__main}>
      <section className={styles.main__left}>
        <p className={styles.login__brand}>GitX</p>
        <h1>Code Connects.</h1>
        <div className={styles.buttons}>
          <Button onClick={handleLogin}>Continue with GitHub</Button>
          <Button variant="ghost" onClick={handleGuestLogin}>
            Continue as Guest
          </Button>
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
