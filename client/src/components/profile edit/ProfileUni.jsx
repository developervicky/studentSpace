import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

export default function ProfileUni({ owner, user }) {
  return (
    <>
      <div className="flex flex-col gap-4 whitespace-pre-line rounded-lg border-2 border-primary2 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
            Courses
          </h1>
          {owner?._id == user?._id && (
            <Link to={"addcourses/"} className="text-xl">
              <IoAddCircleOutline />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-4 text-sm text-gray-500 md:text-base">
          {user?.accType == "university" &&
            user?.courses.map((course, index) => (
              <div
                key={index}
                className="flex items-start justify-between pr-2"
              >
                <div className="flex flex-col gap-1 leading-relaxed">
                  <div>
                    <p className="font-bold tracking-wide">
                      {course.degName} in {course.courseName}
                    </p>
                    <p className="text-sm font-semibold capitalize tracking-wide">
                      {course.duration} - &#8377;{course.tuitionFee}/sem
                    </p>
                  </div>
                  <p className="text-sm">{course.desc}</p>
                  {/* <p className="text-sm">{uni.percentage}%</p> */}
                </div>
                {owner?._id == user?._id && (
                  <div>
                    <Link to={`editcourse/${course._id}`} className="text-xl">
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
