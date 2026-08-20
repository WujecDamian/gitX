import styles from "./Login.module.css";

const Login = () => {
  //const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/login/github";
  };

  const handleGuestLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/login/guest";
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
        <img src="Frontend/public/X_logo_png.png" alt="GitX logo" />
      </section>
    </main>
  );
};

export default Login;
