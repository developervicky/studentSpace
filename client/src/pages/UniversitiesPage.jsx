import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";

export default function UniversityPage() {
  const { user } = useContext(UserContext);

  const [uniData, setUniData] = useState([]);

  useEffect(() => {
    axios.get("/api/universitiesData").then((res) => {
      setUniData([res.data]);
    });
  }, []);

  return (
    <>
      {uniData ? (
        <div className="m-10 flex grow flex-col gap-7 rounded-lg border-2 border-primary2 p-4 text-white">
          <h1 className=" text-xl tracking-wide">Universities</h1>
          <div className="grid grid-cols-4 gap-4 ">
            {uniData.map((uni) =>
              uni.map((each, index) => (
                <Link
                  to={
                    user._id == each._id
                      ? `/user/profile/${each?._id}/`
                      : `/user/universities/${each?._id}/univ`
                  }
                  className=" flex flex-col items-center rounded-lg border-2  border-primary3 p-4 tracking-wide"
                  key={index}
                >
                  <img
                    src={each.profilePhoto[each.profilePhoto.length - 1]}
                    alt={each.profilePhoto[each.profilePhoto.length - 1]}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                  <h1 className="mt-2 font-semibold">{each.fname}</h1>
                  <p className="text-xs">
                    {each.city}, {each.country}
                  </p>
                </Link>
              )),
            )}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
