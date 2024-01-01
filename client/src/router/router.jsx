import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import ProfilePage from "../pages/ProfilePage";
import axios from "axios";
import EmailVerify from "../components/EmailVerify";

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
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/users/:id/verify/:token",
    element: <EmailVerify />,
  },
]);

export default router;
