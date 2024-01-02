import React, { useContext } from "react";
import { UserContext } from "../../components/UserContext";

export default function Rightbar() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="flex w-full max-w-[17rem] flex-col items-center">
        <div>
        </div>
      </div>
    </>
  );
}
