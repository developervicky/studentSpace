import { useParams } from "react-router-dom";
import AboutModal from "../components/profile edit/profile modal/AboutModal";
import AddEducationModal from "../components/profile edit/profile modal/AddEducationModal";
import EditEducationModal from "../components/profile edit/profile modal/EditEducationModal";

export default function ModalLayout() {
  const { action, id } = useParams();
  console.log(action);
  return (
    <>
      {action == "about" && <AboutModal />}
      {action == "addedu" && <AddEducationModal />}
      {action == "editedu" && <EditEducationModal />}
    </>
  );
}
