import { MdOutlineEdit } from "react-icons/md";

import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";

export default function ProfileAch({ user }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
          Achievements
        </h1>
        <Link to={"addach"} className="text-xl">
          <IoAddCircleOutline />
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-500 md:text-base">
        {user?.accType == "student" &&
          user?.awards?.map((award) => (
            <div
              key={award._id}
              className="flex items-start justify-between pr-2"
            >
              <div className="leading-relaxed">
                <div className="flex items-center gap-7">
                  <div>
                    <p className="font-bold tracking-wide">{award.name}</p>
                    <p className="font-bold tracking-wide">
                      {award.organization}
                    </p>
                    <p className="text-sm">{award.year}</p>
                  </div>
                  <div>
                    <div className=" flex gap-2">
                      {award.links.map((each, index) => (
                        <a
                          className="flex items-center gap-1 rounded-2xl border-2 border-primary2 bg-primary2 px-2 py-1  text-xs text-gray-400 underline underline-offset-2"
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                          href={`${each.link}`}
                        >
                          <FaLink />
                          {each.linkName}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-2 tracking-wide">{award.desc}</p>
              </div>
              <div>
                <Link to={`editach/${award._id}`} className="text-xl">
                  <MdOutlineEdit />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
