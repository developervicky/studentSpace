import { useContext } from "react";
import { UserContext } from "../../components/UserContext";
import MobileLeftbar from "./MobileLeftbar";
import DesktopLeftbar from "./DesktopLeftbar";

export default function Leftbar() {
  const { windowSize } = useContext(UserContext);

  return (
    <>{windowSize[0] >= "1024" ? <DesktopLeftbar /> : <MobileLeftbar />}</>
  );
}
