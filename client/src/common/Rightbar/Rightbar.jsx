import React, { useContext } from "react";
import { UserContext } from "../../components/UserContext";

export default function Rightbar() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="flex w-full max-w-[17rem] flex-col items-center justify-around text-white">
        <div className="border-2 bg-primary">
          <div>
            <img src="" alt="" />
          </div>
          <p>{user?.fname}</p>
        </div>
      </div>
    </>
  );
}
