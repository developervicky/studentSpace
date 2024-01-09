import axios from "axios";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function ProfilePhotoModal({ setModalOn }) {
  const [photoInfo, setPhotoInfo] = useState();
  const [loading, setLoading] = useState(false);
  const uploadPhoto = () => {
    setLoading(true);
    const profilePhotoData = new FormData();
    profilePhotoData.append("profilePhoto", photoInfo[0]);
    axios
      .post("/upload/profilepic", profilePhotoData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        window.location.href = "/user/profile";
      });
  };
  const deletePhoto = () => {
    axios.delete("/deletedp").then(() => {
      window.location.href = "/user/profile";
    });
  };
  console.log(photoInfo);
  console.log();
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
                <div className="mt-3 flex flex-col  text-left sm:ml-4 sm:mt-0">
                  <h3
                    className="text-base font-semibold leading-6 text-white"
                    id="modal-title"
                  >
                    Add Profile Picture
                  </h3>
                  {loading ? (
                    <div className=" pt-5">
                      <ClipLoader color="#36d7b7" />
                    </div>
                  ) : (
                    <div className=" mt-3 flex w-full flex-col gap-2">
                      <input
                        type="file"
                        onChange={(ev) => {
                          setPhotoInfo(ev.target.files);
                        }}
                      />
                      <p className="text-gray-500">
                        Upload your image in 1:1 for better quality!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className=" justify-between px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={uploadPhoto}
                  className="inline-flex w-full justify-center rounded-md bg-primary2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary3 sm:ml-3 sm:w-auto"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalOn(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={deletePhoto}
                  className="inline-flex w-full justify-center rounded-md bg-caution px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-caution2 sm:ml-3 sm:w-auto"
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
