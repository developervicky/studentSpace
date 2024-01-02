import { useState } from "react";
import { IconButton, List, Drawer, Card } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";
import { LuNewspaper, LuLogOut } from "react-icons/lu";
import { MdOutlineFeed } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

export default function MobileLeftbar({ logout }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <List className="bg-primary5 flex h-screen min-h-screen min-w-fit flex-col items-center justify-around gap-4 rounded-none">
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
          )}
        </IconButton>
        <div className="flex flex-col gap-14">
          <Link to={"/user/profile"}>
            <FaUserCircle className="text-2xl text-white" />
          </Link>
          <Link to={"/user/university"}>
            <LiaUniversitySolid className="text-2xl text-white" />
          </Link>{" "}
          <Link>
            <MdOutlineFeed className="text-2xl text-white" />
          </Link>{" "}
          <Link>
            <LuNewspaper className="text-2xl text-white" />
          </Link>{" "}
          <Link>
            <FaPeopleGroup className="text-2xl text-white" />
          </Link>
        </div>
        <div className="flex flex-col gap-14">
          <Link>
            <IoSettingsOutline className="text-2xl text-white" />
          </Link>{" "}
          <button onClick={logout}>
            <LuLogOut className="text-2xl text-white" />
          </button>
        </div>
      </List>

      <Drawer
        className="bg-primary5 border-primary5 rounded-r-[30px]"
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
