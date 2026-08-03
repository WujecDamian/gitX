import { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import ProtectedRoute from "./Pages/Authentication/ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";

//components
import Login from "./Pages/Authentication/Login/Login";
import Profile from "./Pages/Profile/Profile";

//https://reactrouter.com/start/modes#data
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { path: "/login", element: <Login></Login> },
      {
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          { index: true, element: <Home></Home> },
          { path: "/profile/:userId", element: <Profile></Profile> },
        ],
      },
    ],
  },
]);

export default router;
