import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import ProfilePage from "../pages/ProfilePage";
import UniversityPage from "../pages/UniversityPage";
import axios from "axios";
import EmailVerify from "../components/EmailVerify";
import Layout from "../layout/Layout";
import UserLayout from "../layout/UserLayout";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/users/:id/verify/:token",
    element: <EmailVerify />,
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      {
        path: ":subpage/",
        element: <UserLayout />,
      },
    ],
  },
]);

export default router;
