import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function AddExpModal() {
  const { user } = useContext(UserContext);
  const [exp, setExp] = useState({
    compRole: "",
    empType: "Full-Time",
    compName: "",
    location: "",
    startedYear: "",
    endedYear: "Present",
    desc: "",
  });
  const navigate = useNavigate();

  const addExp = async (e) => {
    e.preventDefault;
    try {
      await axios.post("/api/addExp", { exp }).then(() => {
        window.location.href = `/user/profile/${user._id}`;
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(exp);
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
                    Add Experience
                  </h3>
                  <div className="mt-3 flex w-full flex-col gap-4">
                    <input
                      type="text"
                      value={exp.compRole}
                      placeholder="Role (e.g. Product Manager)"
                      onChange={(e) => {
                        setExp({ ...exp, compRole: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <div className="custom-select">
                      <select
                        id="empType"
                        value={exp.empType}
                        className=" w-full rounded-md bg-gray-700 px-2  py-3 pl-4 tracking-wide text-white md:py-4 md:pl-6 "
                        onChange={(e) => {
                          setExp({
                            ...exp,
                            empType: e.target.value,
                          });
                        }}
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={exp.compName}
                      placeholder="Company Name (e.g. Microsoft)"
                      onChange={(e) => {
                        setExp({ ...exp, compName: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <input
                      type="text"
                      value={exp.location}
                      placeholder="Company location (Chennai, India)"
                      onChange={(e) => {
                        setExp({ ...exp, location: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={exp.startedYear}
                        placeholder="Started Year"
                        onChange={(e) => {
                          setExp({ ...exp, startedYear: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                      <input
                        type="text"
                        value={exp.endedYear}
                        placeholder="Ended Year"
                        onChange={(e) => {
                          setExp({ ...exp, endedYear: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                    </div>
                    <textarea
                      name="desc"
                      placeholder="Describe your Work! What you did there?"
                      value={exp.desc}
                      onChange={(e) => setExp({ ...exp, desc: e.target.value })}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={addExp}
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
          </div>
        </div>
      </div>
    </div>
  );
}
