import React, { useContext } from "react";
import { UserContext } from "../../components/UserContext";

export default function Rightbar() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="sticky inset-y-0 left-0  hidden h-screen w-full max-w-[17rem] flex-col items-center justify-around border-2 bg-primary text-white mobile:flex">
        <div className="">
          <div>
            <img src="" alt="" />
          </div>
          <p>{user?.fname}</p>
        </div>
      </div>
    </>
  );
}
