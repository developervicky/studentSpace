import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import UniAbout from "../components/UniEdit/UniAbout";
// import LoadingPage from "./LoadingPage";
// import { Link } from "react-router-dom";

export default function UniversityPage() {
  const [uniData, setUniData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/univ/${id}`).then((res) => {
      setUniData(res.data);
    });
  }, [id]);

  return (
    <>
      {!uniData ? (
        <LoadingPage />
      ) : (
        id == uniData?._id && (
          <div className="my-10 flex w-full flex-col gap-5 text-white">
            <UniAbout uni={uniData} />
          </div>
        )
      )}
    </>
  );
}
