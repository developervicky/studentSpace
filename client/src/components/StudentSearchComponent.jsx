

export default function StudentSearchComponent({ studentData }) {
  return (
    <>
      <div className="flex flex-col gap-2 overflow-hidden border-b-2 border-primary2/20 p-4">
        <h2 className="text-lg ">Students</h2>
        <div className="grid grid-cols-5 gap-5">
          {studentData?.length > 0 ? (
            studentData?.map((student, index) => (
              <div
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
              </div>
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
