import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../components/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddBlogPage() {
  const { user } = useContext(UserContext);
  const { page, id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    summary: "",
    cover: "",
    content: "",
    author: user.fname,
    ownerID: user._id,
  });

  const submitBlog = (e) => {
    e.preventDefault();
    const blogInfo = new FormData();
    blogInfo.set("title", blog.title);
    blogInfo.set("summary", blog.summary);
    blogInfo.set("cover", blog.cover[0]);
    blogInfo.set("content", blog.content);
    blogInfo.set("author", blog.author);
    blogInfo.set("ownerID", blog.ownerID);

    axios.post("/api/addblog", blogInfo).then(() => {
      window.location.href = "/user/blogs";
    });
  };

  const updateBlog = (e) => {
    e.preventDefault();
    const blogInfo = new FormData();
    blogInfo.set("title", blog.title);
    blogInfo.set("summary", blog.summary);
    blogInfo.set("cover", blog.cover[0]);
    blogInfo.set("content", blog.content);
    blogInfo.set("author", blog.author);
    blogInfo.set("ownerID", blog.ownerID);

    axios.put(`/api/editblog/${id}`, blogInfo).then(() => {
      window.location.href = "/user/blogs";
    });
  };

  if (id) {
    axios.get(`/api/blog/${id}`).then((res) => {
      const { title, author, content, cover, summary, ownerID } = res.data;
      setBlog({
        title,
        author,
        content,
        cover,
        summary,
        ownerID,
      });
    });
  }

  console.log(blog);
  return (
    <>
      <div className="my-10 flex grow flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4 tracking-wide text-white">
        <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
          {page == "addblog" && "Add New Blog"}
          {page == "editblog" && "Edit Blog"}
        </h1>
        <div className="flex flex-col justify-between gap-3 xl:flex-row xl:gap-16">
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
                setBlog({ ...blog, summary: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h1 className="font-semibold">Cover Photo</h1>

            <input
              type="file"
              placeholder="Summary in one line"
              onChange={(e) => {
                setBlog({ ...blog, cover: e.target.files });
              }}
            />
          </div>
        </div>
        <div className="flex grow flex-col gap-3">
          <h1 className="font-semibold">Summary</h1>
          <QuillEditor
            value={blog.content}
            onChange={(newValue) => setBlog({ ...blog, content: newValue })}
            className="  text-white  xl:h-[20rem]"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={page == "addblog" ? submitBlog : updateBlog}
            className=" hiver:bg-primary3 rounded-lg border-2 border-primary2 bg-primary2 p-2 hover:bg-primary3"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
