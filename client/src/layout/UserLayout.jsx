import { useParams } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import UniversityPage from "../pages/UniversityPage";
import SettingsPage from "../pages/SettingsPage";
import SearchPage from "../pages/SearchPage";
import UniversitiesPage from "../pages/UniversitiesPage";

export default function UserLayout() {
  const { page } = useParams();
  // console.log(subpage);
  return (
    <>
      {page == "profile" && <ProfilePage />}
      {page == "universities" && <UniversitiesPage />}
      {page == "univ" && <UniversityPage />}
      {page == "settings" && <SettingsPage />}
      {page == "search" && <SearchPage />}
    </>
  );
}
