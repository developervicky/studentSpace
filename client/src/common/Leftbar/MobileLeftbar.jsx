import { useContext, useState } from "react";
import { IconButton, List, Drawer, Card } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";
import { LuNewspaper, LuLogOut } from "react-icons/lu";
import { MdOutlineFeed } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { UserContext } from "../../components/UserContext";

export default function MobileLeftbar({ logout }) {
  const { user } = useContext(UserContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <List className="sticky inset-y-0 left-0  flex h-screen min-h-screen  min-w-fit flex-col items-center justify-around gap-4 rounded-none bg-primary5">
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
          )}
        </IconButton>
        <div className="flex flex-col gap-14">
          <Link to={"/user/search"}>
            <FaSearch className="text-2xl text-white" />
          </Link>
          <Link to={`/user/profile/${user._id}`}>
            <FaUserCircle className="text-2xl text-white" />
          </Link>
          {user.accType !== "university" && (
            <Link to={"/user/universities"}>
              <LiaUniversitySolid className="text-2xl text-white" />
            </Link>
          )}
          <Link to={"/user/feed"}>
            <MdOutlineFeed className="text-2xl text-white" />
          </Link>
          <Link to={"/user/blogs"}>
            <LuNewspaper className="text-2xl text-white" />
          </Link>
          <Link to={"/user/community"}>
            <FaPeopleGroup className="text-2xl text-white" />
          </Link>
        </div>
        <div className="flex flex-col gap-14">
          <Link to={"/user/settings"}>
            <IoSettingsOutline className="text-2xl text-white" />
          </Link>{" "}
          <button onClick={logout}>
            <LuLogOut className="text-2xl text-white" />
          </button>
        </div>
      </List>

      <Drawer
        className="rounded-r-[30px] border-primary5 bg-primary5"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <Card
          color="transparent"
          shadow={false}
          className="flex h-screen w-full flex-col justify-around p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <h1 className="flex text-[1.77rem] font-bold tracking-widest text-white">
              studentSpace
            </h1>
          </div>

          <List>
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
              <FaPeopleGroup className="text-lg" />
              <p>Community</p>
            </Link>
          </List>

          <hr className="my-2 border-blue-gray-50" />

          <List>
            <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ">
              <IoSettingsOutline className="text-2xl" />
              <p>Settings</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary "
            >
              <LuLogOut className="text-2xl" />
              <p>Logout</p>
            </button>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
