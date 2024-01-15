import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

export default function ProfileWork({ owner, user }) {
  return (
    <>
      <div className="flex flex-col gap-4 whitespace-pre-line rounded-lg border-2 border-primary2 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
            Work Experiences
          </h1>
          {owner?._id == user?._id && (
            <Link to={"addwork/"} className="text-xl">
              <IoAddCircleOutline />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-4 text-sm text-gray-500 md:text-base">
          {user?.accType == "faculty" &&
            user?.experiences.map((work, index) => (
              <div
                key={index}
                className="flex items-start justify-between pr-2 capitalize tracking-wide"
              >
                <div className="flex flex-col gap-1 leading-relaxed">
                  <div>
                    <p className="text-lg font-semibold ">{work.compRole}</p>
                    <p>
                      {work.compName} - {work.location}
                    </p>
                    <p>
                      {work.empType}, {work.startedYear} - {work.endedYear}
                    </p>
                  </div>
                  <p>{work.desc}</p>
                  {/* <p className="text-sm">{course.desc}</p> */}
                  {/* <p className="text-sm">{uni.percentage}%</p> */}
                </div>
                {owner?._id == user?._id && (
                  <div>
                    <Link to={`editexp/${work._id}`} className="text-xl">
                      <MdOutlineEdit />
                    </Link>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
