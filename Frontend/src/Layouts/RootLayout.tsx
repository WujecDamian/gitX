import { Outlet } from "react-router-dom";

import { useAuth } from "../Contexts/Auth/AuthContext";

function RootLayout() {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
