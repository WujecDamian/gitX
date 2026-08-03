import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

import { useAuth } from "../Contexts/Auth/AuthContext";

function RootLayout() {
  const { user, logout } = useAuth();

  return (
    <>
      {user && <Navbar></Navbar>}

      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default RootLayout;
