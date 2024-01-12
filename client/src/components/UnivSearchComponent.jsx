import React from "react";
import { Link } from "react-router-dom";

export default function UnivSearchComponent({ univData, owner }) {
  return (
    <>
      <div className="flex flex-col gap-2 overflow-hidden border-b-2 border-primary2/20 p-4">
        <h2 className="text-lg ">Universities</h2>
        <div className="grid grid-cols-5 gap-5">
          {univData?.length > 0 ? (
            univData?.map((univ, index) => (
              <Link
                to={
                  owner._id == univ._id
                    ? `/user/profile/${univ?._id}/`
                    : `/user/search/${univ?._id}/univ`
                }
                key={index}
                className="flex flex-col  items-center rounded-lg border-2 border-primary2 p-2"
              >
                {univ?.profilePhoto?.length > 0 && (
                  <div className="overflow-hidden rounded-full">
                    <img
                      src={univ?.profilePhoto[univ.profilePhoto.length - 1]}
                      alt={univ?.profilePhoto[univ.profilePhoto.length - 1]}
                      className="h-20 w-20 object-cover"
                    />
                  </div>
                )}
                <h2 className="font-medium tracking-wide">{univ?.fname}</h2>
                <div className="flex flex-col items-center text-xs tracking-wide">
                  <p>{univ?.accType}</p>
                  <p>
                    {univ?.city},{univ?.country}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="mx-auto tracking-wide text-gray-500">
              No University Data Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}
