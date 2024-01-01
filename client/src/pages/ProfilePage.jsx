import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  if(!user) {
    return <Navigate to={"/"} />
  }

  return <div>{user?.fname}</div>;
}
