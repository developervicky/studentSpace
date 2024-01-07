import { useParams } from "react-router-dom";
import AboutModal from "../components/profile edit/profile modal/AboutModal";
import AddEducationModal from "../components/profile edit/profile modal/AddEducationModal";
import EditEducationModal from "../components/profile edit/profile modal/EditEducationModal";
import AddProjectModal from "../components/profile edit/profile modal/AddProjectModal";
import EditProjectModal from "../components/profile edit/profile modal/EditProjectModal";

export default function ModalLayout() {
  const { action } = useParams();
  console.log(action);
  return (
    <>
      {action == "addabout" && <AboutModal />}
      {action == "addedu" && <AddEducationModal />}
      {action == "editedu" && <EditEducationModal />}
      {action == "addproject" && <AddProjectModal />}
      {action == "editproject" && <EditProjectModal />}
    </>
  );
}
