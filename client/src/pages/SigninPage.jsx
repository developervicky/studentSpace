import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import student from "../images/studentvector.png";

export default function SigninPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/signup");
  }, []);

  return (
    <>
      <div className="bg-primary flex  flex-row">
        <div className="  mobile:w-3/5 flex h-screen w-full grow flex-col justify-center px-10  py-7 text-white md:w-4/5 md:px-20 lg:!w-4/5 xl:!w-3/5 ">
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
        <div className="lg:bg-primary2 hidden  text-white lg:mx-10 lg:my-6 lg:flex lg:h-[800px] lg:w-full lg:flex-col  lg:justify-around lg:rounded-[70px]">
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
