import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function AddEducationModal() {
  const { user } = useContext(UserContext);
  const [uni, setUni] = useState({
    name: "",
    degree: "",
    startedYear: Number,
    endedYear: Number,
    percentage: Number,
  });

  const navigate = useNavigate();

  const eduCreate = async (e) => {
    e.preventDefault;
    try {
      await axios.post("/api/eduCreate", uni).then(() => {
        window.location.href = `/user/profile/${user._id}`;
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                    Add Education
                  </h3>
                  <div className=" mt-3 flex w-full flex-col gap-4">
                    <input
                      type="text"
                      value={uni.name}
                      placeholder="University Name"
                      onChange={(e) => {
                        setUni({ ...uni, name: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    ></input>
                    <input
                      type="text"
                      value={uni.degree}
                      placeholder="Degree"
                      onChange={(e) => {
                        setUni({ ...uni, degree: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    ></input>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        value={uni.startedYear}
                        placeholder="Started Year"
                        onChange={(e) => {
                          setUni({ ...uni, startedYear: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                      <input
                        type="number"
                        value={uni.endedYear}
                        placeholder="Ended Year"
                        onChange={(e) => {
                          setUni({ ...uni, endedYear: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                      <input
                        type="number"
                        value={uni.percentage}
                        placeholder="Percentage"
                        onChange={(e) => {
                          setUni({ ...uni, percentage: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={eduCreate}
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
