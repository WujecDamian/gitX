import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
function RootLayout() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default RootLayout;
