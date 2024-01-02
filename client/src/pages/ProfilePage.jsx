import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function ProfilePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="w-full">{user?.fname}</div>
    </>
  );
}
