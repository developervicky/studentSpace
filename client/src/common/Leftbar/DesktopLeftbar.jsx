import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";
import { LuNewspaper, LuLogOut } from "react-icons/lu";
import { MdOutlineFeed } from "react-icons/md";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { IoSettingsOutline } from "react-icons/io5";

export default function DesktopLeftbar() {
  return (
    <div className="bg-primary5 border-primary5 inset-y-0 left-0 hidden h-screen w-full flex-col justify-around rounded-r-[60px] border-2 px-6 text-white lg:flex lg:max-w-[17rem]">
      <h1 className="flex pt-4 text-[1.77rem] font-bold tracking-widest">
        studentSpace
      </h1>
      <div className="flex flex-col  ">
        <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ">
          <FaUserCircle className="text-2xl" />
          <Link>Profile</Link>
        </div>
        <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary ">
          <LiaUniversitySolid className="text-2xl" />
          <Link>University</Link>
        </div>
        <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary ">
          <MdOutlineFeed className="text-2xl" />
          <Link>Feed/Forum</Link>
        </div>
        <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary ">
          <LuNewspaper className="text-2xl" />
          <Link>Blog</Link>
        </div>
        <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl tracking-wider text-white  hover:bg-primary ">
          <UserGroupIcon className="text-2xl" />
          <Link>Community</Link>
        </div>
      </div>
      <hr className="border-1 my-2 w-full max-w-60 border-white" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ">
          <IoSettingsOutline className="text-2xl" />
          <Link>Settings</Link>
        </div>
        <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ">
          <LuLogOut className="text-2xl" />
          <Link>Logout</Link>
        </div>
      </div>
    </div>
  );
}
