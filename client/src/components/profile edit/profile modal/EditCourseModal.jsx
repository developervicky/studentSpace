import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function AddCourseModal() {
  const { user } = useContext(UserContext);
  const { subid } = useParams();

  const [course, setCourse] = useState({
    degName: "",
    courseName: "",
    duration: "",
    tuitionFee: Number,
    desc: "",
  });
  const navigate = useNavigate();

  const editCourse = async (e) => {
    e.preventDefault;
    try {
      await axios.put(`/api/editCourse/${subid}`, { course }).then(() => {
        window.location.href = `/user/profile/${user._id}`;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (e) => {
    e.preventDefault;
    try {
      await axios.delete(`/api/courseDelete/${subid}`).then(() => {
        window.location.href = `/user/profile/${user._id}`;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const courseData = user.courses;
    courseData.map((each) => {
      if (each._id == subid) {
        let { courseName, degName, desc, duration, tuitionFee } = each;
        setCourse({
          courseName,
          degName,
          desc,
          duration,
          tuitionFee,
        });
      }
    });
  }, [subid, user.courses]);

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
                    Course
                  </h3>
                  <div className="mt-3 flex w-full flex-col gap-4">
                    <input
                      type="text"
                      value={course.degName}
                      placeholder="Degree Name (B.Tech)"
                      onChange={(e) => {
                        setCourse({ ...course, degName: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <input
                      type="text"
                      value={course.courseName}
                      placeholder="Course Name (Computer Engineering)"
                      onChange={(e) => {
                        setCourse({ ...course, courseName: e.target.value });
                      }}
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={course.duration}
                        placeholder="Duration (eg: 6 Months or 1 Year)"
                        onChange={(e) => {
                          setCourse({ ...course, duration: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                      <input
                        type="number"
                        value={course.tuitionFee}
                        placeholder="Tution Fee /sem (numeric value)"
                        min={1}
                        onChange={(e) => {
                          setCourse({ ...course, tuitionFee: e.target.value });
                        }}
                        className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                      />
                    </div>
                    <textarea
                      name="desc"
                      placeholder="Describe your Course"
                      value={course.desc}
                      onChange={(e) =>
                        setCourse({ ...course, desc: e.target.value })
                      }
                      className="w-full rounded-md bg-gray-700 p-5 text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" justify-between px-4 py-3 pb-6 sm:flex sm:flex-row-reverse sm:px-6">
              <div className="flex flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={editCourse}
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
                  onClick={deleteCourse}
                  className="inline-flex w-full justify-center rounded-md bg-caution px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-caution2 sm:mr-3 sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
