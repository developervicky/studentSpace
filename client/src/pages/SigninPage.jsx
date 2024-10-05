import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
import student from "../images/studentvector.png";
import { Toastify } from "../common/toastify";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import LoadingPage from "./LoadingPage";

export default function SigninPage() {
  const [credentials, setCredentials] = useState({ userName: "", pwd: "" });
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const { setUser, user, ready } = useContext(UserContext);
  if (user) {
    return <Navigate to={`/user/profile/${user._id}`} />;
  }

  if (!ready) {
    return <LoadingPage />;
  }

  const signin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/signin", credentials);
      setUser(data);
      Toastify("success", "Successful Login!");
      setRedirect(true);
      // Toastify("success", `${data}`);
    } catch (error) {
      Toastify("fail", `${error.response.data}`);
    }
  };

  if (redirect) {
    return <Navigate to={`/user/profile/${user._id}`} />;
  }

  console.log(credentials);
  return (
    <>
      <div className="flex flex-row  bg-primary">
        <div className="  flex h-screen w-full grow flex-col justify-center px-10 py-7  text-white md:w-4/5 md:px-20 lg:!w-4/5 xl:!w-3/5 mobile:w-3/5 ">
          <h1 className="py-2 text-2xl font-bold tracking-widest md:text-3xl">
            studentSpace
          </h1>
          <div>
            <img src="" alt="" />
          </div>
          <div className="flex flex-col gap-2 py-3 pb-8">
            <h1 className=" text-xl font-semibold tracking-wide md:text-2xl">
              Welcome back!
            </h1>
            <p className="text-sm tracking-wider">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={signin} className="flex flex-col gap-5 md:gap-6 ">
            <input
              type="text"
              id="userName"
              value={credentials.userName}
              className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              placeholder="Username"
              onChange={(e) => {
                setCredentials({ ...credentials, userName: e.target.value });
              }}
            />
            <input
              type="password"
              value={credentials.pwd}
              id="pwd"
              className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              placeholder="Password (min 8 chars)"
              onChange={(e) => {
                setCredentials({ ...credentials, pwd: e.target.value });
              }}
            />
            <div className=" flex items-center gap-3">
              <button
                type="submit"
                className="w-full  rounded-xl bg-primary2 px-2 py-3 pl-4 text-lg font-medium tracking-wide hover:bg-primary3 md:py-4 md:pl-6"
              >
                Signin
              </button>
              {/* <button className=" rounded-full border-2 bg-white p-2 text-xl md:text-3xl">
                <FcGoogle />
                </button> */}
            </div>
            <p className=" text-sm tracking-wide md:text-base">
              No account?{" "}
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer font-semibold underline"
              >
                Signup
              </span>
            </p>
            <div className="flex flex-col rounded-xl  bg-gray1 px-4 py-2 text-sm text-gray-500 ">
              <span>Test User</span>
              <span>Username: test</span>
              <span>Password: 123456</span>
            </div>
          </form>
        </div>
        <div className="hidden text-white  lg:mx-10 lg:my-6 lg:flex lg:h-[800px] lg:w-full lg:flex-col lg:justify-around  lg:rounded-[70px] lg:bg-primary2">
          <h2 className="mx-auto px-10 text-2xl tracking-widest xl:mt-10">
            The one place for students <br /> to halt for any info
          </h2>
          <div className=" grid grid-cols-2 items-center gap-4 text-sm  ">
            <p className="flex justify-center">
              Authenticated University Ratings
            </p>
            <p className="flex justify-center">Academic Queries? Forums</p>

            <p className="flex justify-center">Hashtag Features</p>
            <p className="flex flex-col items-center">
              Not only for Students <br /> <span>Faculties are welcomed</span>
            </p>

            <p className="flex flex-col items-center">
              Trio Community <br />{" "}
              <span>(Students,Faculties,Universities)</span>
            </p>
          </div>
          <img src={student} className=" flex h-fit w-fit " alt="" />
        </div>
      </div>
    </>
  );
}
