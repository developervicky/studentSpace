import { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";
import MobileLeftbar from "./MobileLeftbar";
import DesktopLeftbar from "./DesktopLeftbar";
import axios from "axios";
import { Toastify } from "../toastify";

export default function Leftbar() {
  const { windowSize, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    setUser(null);
    // location.reload();
    setRedirect(false);
    // return <Navigate to="/" />;
  }

  const logout = async () => {
    await axios.post("/logout").then((res) => {
      // console.log(res);
      Toastify("success", `${res.data}`);
      setRedirect(true);
    });
  };

  return (
    <>
      {windowSize[0] >= "1024" ? (
        <DesktopLeftbar logout={logout} />
      ) : (
        <MobileLeftbar logout={logout} />
      )}
    </>
  );
}
