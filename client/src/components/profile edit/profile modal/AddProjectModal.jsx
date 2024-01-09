import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProjectModal() {
  const [project, setProject] = useState({
    name: "",
    startedYear: "",
    endedYear: "",
    desc: "",
  });
  const [link, setLink] = useState([{ link: "", linkName: "" }]);
  // console.log(link);
  // const { user } = useContext(UserContext);

  const navigate = useNavigate();

  let handleChange = (i, e) => {
    let newInputValues = [...link];
    newInputValues[i][e.target.name] = e.target.value;
    setLink(newInputValues);
  };

  const addInput = async () => {
    setLink([...link, { link: "", linkName: "" }]);
  };

  const projectCreate = async (e) => {
    e.preventDefault;
    try {
      await axios.post("/api/projectCreate", { project, link }).then(() => {
        window.location.href = "/user/profile";
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(project);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className=" relative  w-full max-w-lg transform overflow-hidden rounded-lg border-2 border-primary2 bg-gray-800 text-left shadow-xl transition-all sm:my-8 md:max-w-xl lg:max-w-3xl">
            <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 grow  text-left sm:ml-4 sm:mt-0">
                  <h3
                    className="text-base font-semibold leading-6 text-white"
                    id="modal-title"
                  >
                    Add Project
                  </h3>
                  <div className=" mt-3 flex w-full flex-col gap-4">
                    <input
                      type="text"
                      value={project.name}
                      placeholder="Project Name"
                      onChange={(e) => {
                        setProject({ ...project, name: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <textarea
                      type="text"
                      value={project.desc}
                      placeholder="Tell about your Project"
                      onChange={(e) => {
                        setProject({ ...project, desc: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={project.startedYear}
                        placeholder="Started Year"
                        onChange={(e) => {
                          setProject({
                            ...project,
                            startedYear: e.target.value,
                          });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                      <input
                        type="number"
                        value={project.endedYear}
                        placeholder="Ended Year"
                        onChange={(e) => {
                          setProject({ ...project, endedYear: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                    </div>
                    {link.map((element, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <input
                          type="url"
                          value={element.link}
                          name="link"
                          placeholder="Project Link"
                          onChange={(e) => {
                            handleChange(index, e);
                          }}
                          className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                        />
                        <input
                          type="text"
                          value={element.linkName}
                          name="linkName"
                          placeholder="Link Name"
                          onChange={(e) => {
                            handleChange(index, e);
                          }}
                          className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className=" justify-between px-4 py-3 pb-6 sm:flex sm:flex-row-reverse sm:px-6">
              <div className="flex flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={projectCreate}
                  className="inline-flex w-full justify-center rounded-md bg-primary2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary3 sm:ml-3 sm:w-auto"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => addInput()}
                  className="inline-flex w-full justify-center rounded-md bg-primary2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary3 sm:mr-3 sm:w-auto"
                >
                  Add extra link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
