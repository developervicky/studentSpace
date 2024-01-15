import { FaRegUserCircle } from "react-icons/fa";

export default function ProfileUser({ user, owner }) {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4">
        <div className="flex items-center gap-4 ">
          <div className=" overflow-hidden rounded-full">
            {user?.profilePhoto?.length > 0 ? (
              <div className=" overflow-hidden rounded-full">
                <img
                  src={user.profilePhoto[user.profilePhoto.length - 1]}
                  alt={user.profilePhoto[user.profilePhoto.length - 1]}
                  className="h-36 w-36 object-cover"
                />
              </div>
            ) : (
              <FaRegUserCircle className="h-36 w-36 text-gray-700" />
            )}
          </div>
          <div className="font-semibold tracking-wide ">
            <h1 className="text-lg md:text-2xl">{user?.fname}</h1>
            <p className="text-xs font-light  capitalize">
              {user?.accType == "student"
                ? `${user?.accType} - ${user?.education[0]?.name}`
                : `${user?.accType}`}
            </p>
            <p className="text-xs font-light capitalize">
              {user?.city}, {user?.country}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
