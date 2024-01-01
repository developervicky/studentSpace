import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(true);
  const [errMsg, setErrmsg] = useState("");
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/api/${id}/verify/${token}`;
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setErrmsg(error.response.data);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [id, token]);
  return (
    <>
      <div className="flex h-screen  w-full flex-col items-center justify-center  ">
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 border-2 border-primary bg-primary text-xl tracking-wide text-white mobile:h-fit mobile:w-fit mobile:rounded-xl mobile:p-10 mobile:text-2xl">
          <h1 className="pb-5 font-semibold tracking-wide">studentSpace</h1>

          <div className="flex flex-col items-center gap-5">
            {validUrl ? (
              <h2>Email verified successfully</h2>
            ) : (
              <h2>{errMsg}</h2>
            )}
            <Link
              to={"/signin"}
              className="rounded-md border-2 border-primary2 bg-primary2 px-4 py-2 text-base"
            >
              Signin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
