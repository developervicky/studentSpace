import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/signup");
  }, []);

  return (
    <>
      <div className="bg-primary  mobile:w-4/5  mx-auto flex h-screen w-full flex-col justify-center px-10 py-7 text-white md:px-20 lg:!w-3/5 ">
        <h1 className="py-2 text-2xl font-bold tracking-widest md:text-3xl">
          studentSpace
        </h1>
        <div>
          <img src="" alt="" />
        </div>
        <div className="flex flex-col gap-2 py-3 pb-8">
          <h1 className=" text-xl font-semibold tracking-wide md:text-2xl">
            Welcome Back!
          </h1>
          <p className="text-sm tracking-wider">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="flex flex-col gap-5 md:gap-6 ">
          <input
            type="email"
            id="email"
            className=" bg-gray1 rounded-xl px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
            placeholder="Email address (only school ID’s)"
            // onChange={}
          />
          <input
            type="password"
            id="pwd"
            className=" bg-gray1 rounded-xl px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
            placeholder="Password (min 8 chars)"
            // onChange={}
          />

          <div className=" flex items-center gap-3">
            <button
              type="submit"
              className="bg-primary2  hover:bg-primary3 w-full rounded-xl px-2 py-3 pl-4 text-lg font-medium tracking-wide md:py-4 md:pl-6"
              onClick={""}
            >
              Signin
            </button>
            <button className=" rounded-full border-2 bg-white p-2 text-xl md:text-3xl">
              <FcGoogle />
            </button>
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
        </form>
      </div>
    </>
  );
}
