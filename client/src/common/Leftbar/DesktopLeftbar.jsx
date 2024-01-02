import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { LiaUniversitySolid } from "react-icons/lia";
import { LuNewspaper, LuLogOut } from "react-icons/lu";
import { MdOutlineFeed } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export default function DesktopLeftbar({ logout }) {
  return (
    <div className="bg-primary5 border-primary5  hidden h-screen w-full max-w-[17rem] flex-col justify-around rounded-r-[60px] border-2 px-6 text-white lg:flex">
      <h1 className="flex pt-4 text-[1.77rem] font-bold tracking-widest">
        studentSpace
      </h1>
      <div className="flex flex-col  ">
        <Link
          to={"/user/profile"}
          className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary "
        >
          <FaUserCircle className="text-2xl" />
          <p>Profile</p>
        </Link>
        <Link
          to={"/user/university"}
          className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary "
        >
          <LiaUniversitySolid className="text-2xl" />
          <p>University</p>
        </Link>
        <Link className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary ">
          <MdOutlineFeed className="text-2xl" />
          <p>Feed/Forum</p>
        </Link>
        <Link className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary ">
          <LuNewspaper className="text-2xl" />
          <p>Blog</p>
        </Link>
        <Link className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary ">
          <FaPeopleGroup className="text-2xl" />
          <p>Community</p>
        </Link>
      </div>
      <hr className="border-1 my-2 w-full max-w-60 border-white" />
      <div className="flex flex-col gap-2">
        <Link className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ">
          <IoSettingsOutline className="text-2xl" />
          <p>Settings</p>
        </Link>
        <button
          onClick={logout}
          className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary "
        >
          <LuLogOut className="text-2xl" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}
