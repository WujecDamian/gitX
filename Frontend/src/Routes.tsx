import { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import ProtectedRoute from "./Pages/Authentication/ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";

//components
import Login from "./Pages/Authentication/Login/Login";

//https://reactrouter.com/start/modes#data
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      {
        element: <ProtectedRoute></ProtectedRoute>,
        children: [{ path: "/profile/:userId", element: Profile }],
      },
    ],
  },
]);

export default router;
