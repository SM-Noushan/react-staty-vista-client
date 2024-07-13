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
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
import MyBookings from "../pages/Dashboard/Guest/MyBookings";
import ManageBookings from "../pages/Dashboard/Host/ManageBookings";

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
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "add-room",
        element: (
          <HostRoute>
            <AddRoom />,
          </HostRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <HostRoute>
            <MyListings />,
          </HostRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <HostRoute>
            <ManageBookings />,
          </HostRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />,
          </AdminRoute>
        ),
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
