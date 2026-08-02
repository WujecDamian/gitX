import { useAuth } from "../../Contexts/Auth/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  if (loading) return <div>Loading your dashboard...</div>;
  if (!user) return <div>Please log in to view this page.</div>;
  return (
    <nav>
      <span>My Project</span>
      {user ? (
        <div>
          <span>Hi, {user.displayName}</span>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3000/api/auth/login")
          }
        >
          Login with GitHub
        </button>
      )}
    </nav>
  );
}
