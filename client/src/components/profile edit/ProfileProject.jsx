import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function ProfileProject() {
  const { user } = useContext(UserContext);
  user.projects.map((project) => {
    project.links.map((each) => {
      console.log(each);
    });
  });
  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4">
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
            className="flex items-center justify-between pr-2"
          >
            <div>
              <p>{project.name}</p>
              <div className=" flex  gap-2">
                {project.links.map((each, index) => (
                  <a key={index} href={`https://${each.link}`}>
                    {each.linkName}
                  </a>
                ))}
              </div>
              <p>
                {project.startedYear} to {project.endedYear}
              </p>
              <p>{project.desc}</p>
            </div>
            <div>
              <Link to={`editproject/${project?._id}`} className="text-xl">
                <MdOutlineEdit />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
