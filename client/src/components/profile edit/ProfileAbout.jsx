import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProfileAbout({ user }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
          About
        </h1>
        <Link to={"addabout"} className="text-xl">
          <MdOutlineEdit />
        </Link>
      </div>
      <p className="whitespace-pre-line text-sm text-gray-500 md:text-base ">
        {user?.bio}
      </p>
    </div>
  );
}
