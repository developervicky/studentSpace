import { Link, useParams } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { LiaUniversitySolid } from "react-icons/lia";
import { LuNewspaper, LuLogOut } from "react-icons/lu";
import { MdOutlineFeed } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";

export default function DesktopLeftbar({ logout }) {
  const { user } = useContext(UserContext);
  const { subpage } = useParams();

  const hoverClass = (type) => {
    let classes =
      "flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ";
    if (subpage == type) {
      classes += "bg-primary";
    }
    return classes;
  };
  return (
    <div className="sticky top-0 hidden h-screen  w-full max-w-[17rem] flex-col justify-around rounded-r-[60px] border-2 border-primary5 bg-primary5 px-6 text-white lg:flex">
      <h1 className="flex pt-4 text-[1.77rem] font-bold tracking-widest">
        studentSpace
      </h1>
      <div className="flex flex-col gap-2 ">
        <Link to={"/user/search"} className={hoverClass("search")}>
          <FaSearch className="text-2xl" />
          <p>Search</p>
        </Link>
        <Link
          to={`/user/profile/${user._id}`}
          className={hoverClass("profile")}
        >
          <FaUserCircle className="text-2xl" />
          <p>Profile</p>
        </Link>
        <Link to={"/user/university"} className={hoverClass("university")}>
          <LiaUniversitySolid className="text-2xl" />
          <p>University</p>
        </Link>
        <Link to={"/user/feed"} className={hoverClass("feed")}>
          <MdOutlineFeed className="text-2xl" />
          <p>Feed/Forum</p>
        </Link>
        <Link to={"/user/blog"} className={hoverClass("blog")}>
          <LuNewspaper className="text-2xl" />
          <p>Blog</p>
        </Link>
        <Link to={"/user/community"} className={hoverClass("community")}>
          <FaPeopleGroup className="text-2xl" />
          <p>Community</p>
        </Link>
      </div>
      <hr className="border-1 my-2 w-full max-w-60 border-white" />
      <div className="flex flex-col gap-2">
        <Link to={"/user/settings"} className={hoverClass("settings")}>
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
