const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/github";
  };

  return (
    <>
      <button onClick={handleLogin}>Log in with GitHub</button>
    </>
  );
};

export default Login;
