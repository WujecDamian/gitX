import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Contexts/Auth/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading your dashboard...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRoute;
