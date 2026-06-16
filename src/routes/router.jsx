import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ViniloPage from "../pages/VinilosPage";
import ViniloDetailPage from "../pages/ViniloDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

import Adminlayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import AdminVinilosPage from "../pages/admin/AdminVinilosPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

import adminLoader from "../loaders/adminLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "vinilos",
        element: <ViniloPage />,
      },
      {
        path: "vinilos/:id",
        element: <ViniloDetailPage />,
      },
      // {
      //   path: "*",
      //   element: <NotFoundPage />,
      // },
    ],
  },
  {
    path: "/auth",
    element: <MainLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      {
        index: true,
        loader: adminLoader,
        element: <DashboardPage />,
      },
      {
        path: "vinilos",
        loader: adminLoader,
        element: <AdminVinilosPage />,
      },
    ],
  },
]);
