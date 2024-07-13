import { createBrowserRouter } from "react-router-dom";

import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import AddRoom from "../pages/Dashboard/Host/AddRoom";
import Profile from "../pages/Dashboard/Common/Profile";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import MyListings from "../pages/Dashboard/Host/MyListings";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "add-room",
        element: <AddRoom />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
