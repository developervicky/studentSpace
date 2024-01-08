import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAchModal() {
  const [ach, setAch] = useState({
    name: "",
    organization: "",
    year: "",
    desc: "",
  });
  const [links, setLinks] = useState([{ link: "", linkName: "" }]);
  // console.log(link);
  // const { user } = useContext(UserContext);

  const navigate = useNavigate();

  let handleChange = (i, e) => {
    let newInputValues = [...links];
    newInputValues[i][e.target.name] = e.target.value;
    setLinks(newInputValues);
  };

  const addInput = async () => {
    setLinks([...links, { link: "", linkName: "" }]);
  };

  const achCreate = async (e) => {
    e.preventDefault;
    try {
      await axios.post("/achCreate", { ach, links }).then(() => {
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
                    Add Achievement
                  </h3>
                  <div className=" mt-3 flex w-full flex-col gap-4">
                    <input
                      type="text"
                      value={ach.name}
                      placeholder="Achievement Name"
                      onChange={(e) => {
                        setAch({ ...ach, name: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={ach.organization}
                        placeholder="Organization"
                        onChange={(e) => {
                          setAch({
                            ...ach,
                            organization: e.target.value,
                          });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                      <input
                        type="number"
                        value={ach.year}
                        placeholder="Year"
                        onChange={(e) => {
                          setAch({
                            ...ach,
                            year: e.target.value,
                          });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                    </div>
                    <textarea
                      type="text"
                      value={ach.desc}
                      placeholder="Tell about your Achievement"
                      onChange={(e) => {
                        setAch({ ...ach, desc: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />

                    {links.map((element, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <input
                          type="url"
                          value={element.link}
                          name="link"
                          placeholder="Achievement Link"
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
                  onClick={achCreate}
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
