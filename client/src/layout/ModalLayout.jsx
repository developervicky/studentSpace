import { useParams } from "react-router-dom";
import AboutModal from "../components/profile edit/profile modal/AboutModal";
import AddEducationModal from "../components/profile edit/profile modal/AddEducationModal";
import EditEducationModal from "../components/profile edit/profile modal/EditEducationModal";
import AddProjectModal from "../components/profile edit/profile modal/AddProjectModal";
import EditProjectModal from "../components/profile edit/profile modal/EditProjectModal";
import AddAchModal from "../components/profile edit/profile modal/AddAchModal";
import EditAchModal from "../components/profile edit/profile modal/EditAchModal";
import ProfilePage from "../pages/ProfilePage";
import AddCourseModal from "../components/profile edit/profile modal/AddCourseModal";
import EditCourseModal from "../components/profile edit/profile modal/EditCourseModal";
// import UniversityPage from "../pages/UniversityPage";

export default function ModalLayout() {
  const { subpage, action } = useParams();
  console.log(subpage);
  return (
    <>
      {subpage == "addedu" && <AddEducationModal />}
      {subpage == "editedu" && <EditEducationModal />}
      {subpage == "addabout" && <AboutModal />}
      {subpage == "addproject" && <AddProjectModal />}
      {subpage == "editproject" && <EditProjectModal />}
      {subpage == "addach" && <AddAchModal />}
      {subpage == "editach" && <EditAchModal />}
      {subpage == "addcourses" && <AddCourseModal />}
      {subpage == "editcourse" && <EditCourseModal />}
      {subpage == "profile" && <ProfilePage />}
      {subpage == "univ" && <ProfilePage />}
      {subpage == "faculty" && <ProfilePage />}
    </>
  );
}
