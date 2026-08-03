import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

import { useAuth } from "../Contexts/Auth/AuthContext";

function RootLayout() {
  const { user, logout } = useAuth();

  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
