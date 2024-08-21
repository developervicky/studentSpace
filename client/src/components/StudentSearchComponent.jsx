import { Link } from "react-router-dom";

export default function StudentSearchComponent({ studentData, owner }) {
  console.log(owner._id);
  return (
    <>
      <div className="flex flex-col gap-2 overflow-hidden border-b-2 border-primary2/20 p-4">
        <h2 className="text-lg ">Students</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {studentData?.length > 0 ? (
            studentData?.map((student, index) => (
              <Link
                to={
                  owner._id == student._id
                    ? `/user/profile/${student?._id}/`
                    : `/user/search/${student?._id}/profile`
                }
                key={index}
                className="flex flex-col  items-center rounded-lg border-2 border-primary2 p-2"
              >
                {student?.profilePhoto?.length > 0 && (
                  <div className="overflow-hidden rounded-full">
                    <img
                      src={
                        student?.profilePhoto[student.profilePhoto.length - 1]
                      }
                      alt={
                        student?.profilePhoto[student.profilePhoto.length - 1]
                      }
                      className="h-20 w-20 object-cover"
                    />
                  </div>
                )}
                <h2 className="font-medium tracking-wide">{student?.fname}</h2>
                <div className="flex flex-col items-center text-xs tracking-wide">
                  <p>{student?.accType}</p>
                  <p>
                    {student?.city},{student?.country}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="mx-auto tracking-wide text-gray-500">
              No Student Data Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}
