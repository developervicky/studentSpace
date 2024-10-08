import { useParams } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
// import UniversityPage from "../pages/UniversityPage";
import SettingsPage from "../pages/SettingsPage";
import SearchPage from "../pages/SearchPage";
import UniversitiesPage from "../pages/UniversitiesPage";
import BlogsPage from "../pages/BlogsPage";
import AddBlogPage from "../pages/AddBlogPage";

export default function UserLayout() {
  const { page } = useParams();
  // console.log(subpage);
  return (
    <>
      <div className="mr-4 flex grow sm:mr-0">
        {page == "profile" && <ProfilePage />}
        {page == "universities" && <UniversitiesPage />}
        {page == "univ" && <ProfilePage />}
        {page == "settings" && <SettingsPage />}
        {page == "search" && <SearchPage />}
        {page == "blogs" && <BlogsPage />}
        {page == "addblog" && <AddBlogPage />}
        {page == "editblog" && <AddBlogPage />}
      </div>
    </>
  );
}
