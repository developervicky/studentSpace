import { useContext } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function ProfileEducation({user}) {
  // const { user } = useContext(UserContext);
  // console.log(user.education);
  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
          Education
        </h1>
        <Link to={"addedu"} className="text-xl">
          <IoAddCircleOutline />
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-500 md:text-base">
        {user.education.map((uni) => (
          <div key={uni._id} className="flex items-start justify-between pr-2">
            <div className="leading-relaxed">
              <p className="font-bold tracking-wide">{uni.name}</p>
              <p className="text-sm font-semibold tracking-wide">
                {uni.degree}
              </p>
              <p className="text-sm">
                {uni.startedYear} to {uni.endedYear}
              </p>
              <p className="text-sm">{uni.percentage}%</p>
            </div>
            <div>
              <Link to={`editedu/${uni._id}`} className="text-xl">
                <MdOutlineEdit />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
