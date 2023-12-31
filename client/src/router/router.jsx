import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage />,
  },
]);

export default router;
