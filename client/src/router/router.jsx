import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage />,
  },
]);

export default router;
