import React, { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import ProfilePhotoModal from "../../components/profile edit/profile modal/ProfilePhotoModal";

export default function Rightbar() {
  const { user } = useContext(UserContext);
  const [modalOn, setModalOn] = useState(false);
  return (
    <>
      <div className="sticky inset-y-0 left-0 hidden h-screen w-full max-w-[17rem] flex-col items-center justify-around rounded-l-[60px]  bg-primary text-white sm:flex">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            {user?.profilePhoto?.length > 0 ? (
              <div className=" overflow-hidden rounded-full">
                <img
                  src={user.profilePhoto[user.profilePhoto.length - 1]}
                  alt={user.profilePhoto[user.profilePhoto.length - 1]}
                  className="h-36 w-36 object-cover"
                />
              </div>
            ) : (
              <FaRegUserCircle className="h-36 w-36 text-gray-700" />
            )}
            <div
              onClick={() => setModalOn(true)}
              className="absolute bottom-1 right-2 cursor-pointer rounded-full bg-white text-3xl text-primary3 hover:text-primary2"
            >
              <MdOutlineAddCircle />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold tracking-wide">
              {user?.fname}
            </h2>
            <p className="text-xs  capitalize tracking-wide">
              {user?.accType == "student"
                ? `${user?.accType} - ${user?.education[0]?.name}`
                : `${user?.accType}`}
            </p>
            <p className="text-xs  capitalize tracking-wide">
              {user?.city}, {user?.country}
            </p>
          </div>
        </div>
      </div>
      <div className={modalOn ? "flex" : "hidden"}>
        {modalOn && <ProfilePhotoModal setModalOn={setModalOn} />}
      </div>
    </>
  );
}
