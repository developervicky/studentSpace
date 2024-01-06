import { MdOutlineEdit } from "react-icons/md";

export default function ProfileAch() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-primary2 py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
          Achievements
        </h1>
        <button className="text-xl">
          <MdOutlineEdit />
        </button>
      </div>
      <div className="flex flex-col gap-2 text-sm text-gray-500 md:text-base">
        <div>
          <p>Ach Name</p>
          <p>Ach Provider</p>
          <p>Ach Link</p>
          <p>Started Year to Ended Year</p>
          <p>Description</p>
        </div>
      </div>
    </div>
  );
}
