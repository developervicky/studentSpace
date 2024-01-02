import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import student from "../images/studentvector.png";
import { Toastify } from "../common/toastify";
import { UserContext } from "../components/UserContext";
import LoadingPage from "./LoadingPage";

export default function SignupPage() {
  const [credentials, setCredentials] = useState({
    fname: "",
    email: "",
    pwd: "",
    accType: "student",
    agreed: false,
    userName: "",
  });
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);
  if (user) {
    return <Navigate to={"/user/profile"} />;
  }
  if (!ready) {
    return <LoadingPage />;
  }

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/signup", credentials);
      // Toastify()
      Toastify("success", `${data}`);
      console.log(data);
      setCredentials({
        accType: "student",
        fname: "",
        email: "",
        pwd: "",
        agreed: false,
        userName: "",
      });
    } catch (error) {
      Toastify("fail", `${error.response.data}`);
      console.log(error.response.data);
    }
  };
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
              Get Started Now
            </h1>
            <p className="text-sm tracking-wider">
              Enter your credentials to access your account
            </p>
          </div>
          <form
            onSubmit={registerUser}
            className="flex flex-col gap-5 md:gap-6 "
          >
            <input
              type="text"
              placeholder="Full Name"
              value={credentials.fname}
              className="rounded-xl bg-gray1 px-2 py-3 pl-4  tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              onChange={(e) => {
                setCredentials({ ...credentials, fname: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Username"
              value={credentials.userName}
              className="rounded-xl bg-gray1 px-2 py-3 pl-4  tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              onChange={(e) => {
                setCredentials({ ...credentials, userName: e.target.value });
              }}
            />
            <input
              type="email"
              id="email"
              value={credentials.email}
              className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              placeholder="Email address (only school ID’s)"
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
            />
            <input
              type="password"
              id="pwd"
              value={credentials.pwd}
              className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              placeholder="Password (min 8 chars)"
              onChange={(e) => {
                setCredentials({ ...credentials, pwd: e.target.value });
              }}
            />
            <div className="custom-select">
              <select
                id="accountype"
                className=" w-full rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium "
                onChange={(e) => {
                  setCredentials({ ...credentials, accType: e.target.value });
                }}
              >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="University">University</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="agree"
                value={credentials.agreed}
                onChange={(e) => {
                  setCredentials({ ...credentials, agreed: e.target.checked });
                }}
              />
              <label
                htmlFor="agree"
                className="text-xs tracking-wide md:text-base"
              >
                I agree to the Terms & Privacy
              </label>
            </div>
            <div className=" flex items-center gap-3">
              <button
                type="submit"
                className="w-full  rounded-xl bg-primary2 px-2 py-3 pl-4 text-lg font-medium tracking-wide hover:bg-primary3 md:py-4 md:pl-6"
              >
                Signup
              </button>
              <button className=" rounded-full border-2 bg-white p-2 text-xl md:text-3xl">
                <FcGoogle />
              </button>
            </div>
            <p className=" text-sm tracking-wide md:text-base">
              Have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="cursor-pointer font-semibold underline"
              >
                Signin
              </span>
            </p>
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
