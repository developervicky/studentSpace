import axios from "axios";
import { useEffect } from "react";

export default function SignupPage() {
  useEffect(() => {
    axios.get("/signup");
  }, []);
  return (
    <>
      <div className="">SignupPage hello</div>
    </>
  );
}
