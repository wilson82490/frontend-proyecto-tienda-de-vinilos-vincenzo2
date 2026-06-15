import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import MoviePage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

import Adminlayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import AdminMoviesPage from "../pages/admin/AdminMoviesPage";
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
        path: "movies",
        element: <MoviePage />,
      },
      {
        path: "movies/:id",
        element: <MovieDetailPage />,
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
        path: "movies",
        loader: adminLoader,
        element: <AdminMoviesPage />,
      },
    ],
  },
]);
