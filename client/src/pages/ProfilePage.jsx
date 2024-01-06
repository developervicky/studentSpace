import { useContext } from "react";
import { UserContext } from "../components/UserContext";

export default function ProfilePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="w-full">{user?.fname}</div>
    </>
  );
}
