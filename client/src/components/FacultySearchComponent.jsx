import React from "react";
import { Link } from "react-router-dom";

export default function FacultySearchComponent({ facultyData, owner }) {
  return (
    <>
      <div className="flex flex-col gap-2 overflow-hidden border-b-2 border-primary2/20 p-4">
        <h2 className="text-lg ">Faculties</h2>
        <div className="grid grid-cols-5 gap-5">
          {facultyData?.length > 0 ? (
            facultyData?.map((faculty, index) => (
              <Link
                to={
                  owner._id == faculty._id
                    ? `/user/profile/${faculty?._id}/`
                    : `/user/search/${faculty?._id}/faculty`
                }
                key={index}
                className="flex flex-col  items-center rounded-lg border-2 border-primary2 p-2"
              >
                {faculty?.profilePhoto?.length > 0 && (
                  <div className="overflow-hidden rounded-full">
                    <img
                      src={
                        faculty?.profilePhoto[faculty.profilePhoto.length - 1]
                      }
                      alt={
                        faculty?.profilePhoto[faculty.profilePhoto.length - 1]
                      }
                      className="h-20 w-20 object-cover"
                    />
                  </div>
                )}
                <h2 className="font-medium tracking-wide">{faculty?.fname}</h2>
                <div className="flex flex-col items-center text-xs tracking-wide">
                  <p>{faculty?.accType}</p>
                  <p>
                    {faculty?.city},{faculty?.country}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="mx-auto tracking-wide text-gray-500">
              No Faculty Data Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}
