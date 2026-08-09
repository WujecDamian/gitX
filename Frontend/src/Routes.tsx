import { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import GridLayout from "./Layouts/GridLayout";
import ProtectedRoute from "./Pages/Authentication/ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";

//components
import Login from "./Pages/Authentication/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Post from "./Pages/Post/Post";
import CommentPage from "./Pages/Comment/CommentPage";

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
          {
            element: <GridLayout></GridLayout>,
            children: [
              { index: true, element: <Home></Home> },
              { path: "/profile/:userId", element: <Profile></Profile> },
              { path: "/post/:postId", element: <Post></Post> },
              {
                path: "/comment/:commentId",
                element: <CommentPage></CommentPage>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
