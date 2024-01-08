import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import ProfileAbout from "../components/profile edit/ProfileAbout";
import ProfileEducation from "../components/profile edit/ProfileEducation";
import ProfileAch from "../components/profile edit/ProfileAch";
import ProfileProject from "../components/profile edit/ProfileProject";

export default function ProfilePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="my-10 flex w-full flex-col gap-5 text-white">
        <ProfileAbout user={user} />
        <ProfileEducation user={user} />
        <ProfileProject user={user} />
        <ProfileAch user={user} />
      </div>
    </>
  );
}
