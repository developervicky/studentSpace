import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { parseISO } from "date-fns";
import axios from "axios";

export default function SettingsPage() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    fname: "",
    email: "",
    userName: "",
    accType: "",
    verified: "",
    createdAt: "",
    city: "",
    country: "",
    state: "",
  });
  console.log(userData);
  const updateData = () => {
    axios.put("/api/updateData", userData).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    let {
      fname,
      email,
      userName,
      accType,
      verified,
      createdAt,
      city,
      country,
      state,
    } = user;
    setUserData({
      fname,
      email,
      userName,
      accType,
      verified,
      createdAt,
      city,
      country,
      state,
    });
  }, [user]);

  let createdDate = parseISO(userData.createdAt).toDateString();
  console.log(createdDate);

  return (
    <>
      <div className="relative my-10 flex grow flex-col justify-between  rounded-lg border-2  border-primary2 p-5 text-white">
        <div className="flex flex-col gap-3 md:gap-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide">Settings</h1>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
              <label className="flex flex-col gap-2">
                <p className="ml-2 text-sm tracking-wide">Full Name</p>
                <input
                  type="text"
                  id="fname"
                  value={userData.fname}
                  className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
                  placeholder="Full name"
                  onChange={(e) => {
                    setUserData({ ...userData, fname: e.target.value });
                  }}
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="ml-2 text-sm tracking-wide">Username</p>
                <input
                  type="text"
                  id="userName"
                  value={userData.userName}
                  className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
                  placeholder="Username"
                  onChange={(e) => {
                    setUserData({ ...userData, userName: e.target.value });
                  }}
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="ml-2 text-sm tracking-wide">Email</p>
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  disabled
                  className=" cursor-not-allowed rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide text-gray-500 md:py-4 md:pl-6 md:text-lg md:font-medium"
                  placeholder="Email (only School ID's)"
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="ml-2 text-sm tracking-wide">Account Type</p>
                <input
                  type="text"
                  id="acctype"
                  value={userData.accType}
                  disabled
                  className="cursor-not-allowed rounded-xl bg-gray1 px-2 py-3 pl-4 capitalize tracking-wide text-gray-500 md:py-4 md:pl-6 md:text-lg md:font-medium"
                  placeholder="Account Type"
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="ml-2 text-sm tracking-wide">City</p>
                <input
                  type="text"
                  id="city"
                  value={userData.city}
                  className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
                  placeholder="City living in"
                  onChange={(e) => {
                    setUserData({ ...userData, city: e.target.value });
                  }}
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="ml-2 text-sm tracking-wide">State</p>
                <input
                  type="text"
                  id="state"
                  value={userData.state}
                  className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
                  placeholder="State"
                  onChange={(e) => {
                    setUserData({ ...userData, state: e.target.value });
                  }}
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="ml-2 text-sm tracking-wide">Country</p>
                <input
                  type="text"
                  id="country"
                  value={userData.country}
                  className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
                  placeholder="Country"
                  onChange={(e) => {
                    setUserData({ ...userData, country: e.target.value });
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex grow flex-col items-end">
            <button
              onClick={updateData}
              className=" rounded-lg border-2 bg-primary3 p-3 tracking-wide hover:bg-primary2 "
            >
              Submit
            </button>
          </div>
        </div>
        <div className=" flex justify-between  gap-5">
          <p className="flex items-center gap-2 rounded-lg border-2 bg-primary3 px-3 py-1 font-semibold tracking-wide">
            {userData.verified ? "User Verified!" : "User Not Verified!"}
            <RiVerifiedBadgeFill />
          </p>
          <p className="flex items-center gap-2 rounded-lg border-2 bg-primary3 px-3 py-1 font-semibold tracking-wide">
            Created at: {createdDate}
          </p>
        </div>
      </div>
    </>
  );
}
