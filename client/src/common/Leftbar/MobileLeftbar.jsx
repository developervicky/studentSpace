import { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";
import { LuNewspaper, LuLogOut } from "react-icons/lu";
import { MdOutlineFeed } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

export default function MobileLeftbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer} className="m-4">
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
        )}
      </IconButton>
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
              <FaPeopleGroup className="text-lg" />
              <Link>Community</Link>
            </div>
          </List>

          <hr className="my-2 border-blue-gray-50" />

          <List>
            <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ">
              <IoSettingsOutline className="text-2xl" />
              <Link>Settings</Link>
            </div>
            <div className="flex items-center  gap-4 rounded-xl py-4 pl-5 pr-10 text-xl  tracking-wider text-white  hover:bg-primary ">
              <LuLogOut className="text-2xl" />
              <Link>Logout</Link>
            </div>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
