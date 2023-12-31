import { useParams } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import UniversityPage from "../pages/UniversityPage";
import SettingsPage from "../pages/SettingsPage";

export default function UserLayout() {
  const { subpage } = useParams();
  // console.log(subpage);
  return (
    <>
      {subpage == "profile" && <ProfilePage />}
      {subpage == "university" && <UniversityPage />}
      {subpage == "settings" && <SettingsPage />}
    </>
  );
}
