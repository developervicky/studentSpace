import axios from "axios";
import { useEffect } from "react";
import logo from "../images/bg.png";

export default function SignupPage() {
  useEffect(() => {
    axios.get("/signup");
  }, []);
  return (
    <>
      <div className="">
        <div className="bg-primary"> hello</div>
      </div>
    </>
  );
}
