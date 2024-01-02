import { Navigate, Outlet } from "react-router-dom";
import Leftbar from "../common/Leftbar/Leftbar";
import Rightbar from "../common/Rightbar/Rightbar";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import LoadingPage from "../pages/LoadingPage";

export default function Layout() {
  const { user, ready } = useContext(UserContext);
  if (!ready) {
    return <LoadingPage />;
  }
  if (!user && ready) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className="flex gap-5 justify-between">
      <Leftbar />
      <Outlet />
      <Rightbar />
    </div>
  );
}
