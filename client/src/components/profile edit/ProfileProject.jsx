import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";

export default function ProfileProject({ user }) {
  // const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col gap-4 whitespace-pre-line rounded-lg border-2 border-primary2 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
          Projects
        </h1>
        <Link to={"addproject/"} className="text-xl">
          <IoAddCircleOutline />
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-500 md:text-base">
        {user.projects.map((project) => (
          <div
            key={project._id}
            className="flex items-start justify-between border-b-2 border-gray-800 pb-4 pr-2"
          >
            <div className="flex grow flex-col leading-relaxed">
              <div className="flex items-center gap-7">
                <div>
                  <p className="font-bold tracking-wide">{project.name}</p>
                  <p className="text-sm">
                    {project.startedYear} to {project.endedYear}
                  </p>
                </div>
                <div className="flex grow justify-between ">
                  <div className=" flex gap-2">
                    {project.links.map((each, index) => (
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
                  <div>
                    <Link
                      to={`editproject/${project?._id}`}
                      className="text-xl"
                    >
                      <MdOutlineEdit />
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-2 tracking-wide">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
