import React, { useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddBlogPage() {
  const [blog, setBlog] = useState({
    title: "",
    summary: "",
    cover: "",
    content: "",
  });
  return (
    <>
      <div className="my-10 flex grow flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4 tracking-wide text-white">
        <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
          Add New Blog
        </h1>
        <div className="flex flex-row justify-between gap-16">
          <div className="flex grow flex-col gap-3">
            <h2 className="font-semibold">Basic Info</h2>
            <input
              type="text"
              value={blog.title}
              className=" w-full rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              placeholder="Title"
              onChange={(e) => {
                setBlog({ ...blog, title: e.target.value });
              }}
            />
            <input
              type="text"
              value={blog.summary}
              className=" rounded-xl bg-gray1 px-2 py-3 pl-4 tracking-wide md:py-4 md:pl-6 md:text-lg md:font-medium"
              placeholder="Summary in one line"
              onChange={(e) => {
                setBlog({ ...blog, title: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h1 className="font-semibold">Cover Photo</h1>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex h-32 w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-primary3 hover:bg-primary3 ">
                <input
                  type="file"
                  className=" hidden"
                  placeholder="Summary in one line"
                  onChange={(e) => {
                    setBlog({ ...blog, cover: e.target.value });
                  }}
                />
                <MdOutlineDriveFolderUpload className="text-[3rem]" />
                <h2 className="text-sm">Upload New Photo</h2>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Summary</h1>
          <QuillEditor className=" p-2" />
        </div>
      </div>
    </>
  );
}
