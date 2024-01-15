import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import ProfileAbout from "../components/profile edit/ProfileAbout";
import ProfileEducation from "../components/profile edit/ProfileEducation";
import ProfileAch from "../components/profile edit/ProfileAch";
import ProfileProject from "../components/profile edit/ProfileProject";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import ProfileUser from "../components/profile edit/ProfileUser";

export default function ProfilePage() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`/api/profileData/${id}`).then((res) => {
        console.log(res.data);
        setUserData(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        id == userData?._id &&
        (userData?.accType == "university" ? (
          <div className="my-10 flex w-full flex-col gap-5 text-white">
            {id !== user._id && <ProfileUser user={userData} owner={user} />}
            <ProfileAbout user={userData} owner={user} />
          </div>
        ) : userData?.accType == "student" ? (
          <div className="my-10 flex w-full flex-col gap-5 text-white">
            {id !== user._id && <ProfileUser user={userData} owner={user} />}
            <ProfileAbout user={userData} owner={user} />
            <ProfileEducation user={userData} owner={user} />
            <ProfileProject user={userData} owner={user} />
            <ProfileAch user={userData} owner={user} />
          </div>
        ) : (
          <div className="my-10 flex w-full flex-col gap-5 text-white">
            {id !== user._id && <ProfileUser user={userData} owner={user} />}
            <ProfileAbout user={userData} owner={user} />
            <ProfileEducation user={userData} owner={user} />
            <ProfileProject user={userData} owner={user} />
            <ProfileAch user={userData} owner={user} />
          </div>
        ))
      )}
    </>
  );
}
