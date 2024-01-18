import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../components/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function BlogPage() {
  const { user } = useContext(UserContext);
  const [blogData, setBlogData] = useState({
    _id: "",
    title: "",
    author: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    summary: "",
    cover: "",
    ownerID: "",
  });
  const { id } = useParams();

  const deleteBlog = (e) => {
    e.preventDefault;
    axios.delete(`/api/deleteblog/${id}`).then(() => {
      window.location.href = "/user/blogs";
    });
  };

  useEffect(() => {
    axios.get(`/api/blog/${id}`).then((res) => {
      const {
        _id,
        title,
        author,
        content,
        cover,
        createdAt,
        updatedAt,
        summary,
        ownerID,
      } = res.data;
      setBlogData({
        _id,
        title,
        author,
        content,
        cover,
        createdAt,
        updatedAt,
        summary,
        ownerID,
      });
    });
  }, [id]);

  console.log(blogData);

  return (
    <>
      <div className="my-10 flex grow flex-col gap-6 rounded-lg border-2 border-primary2 px-6 py-4 tracking-wide text-white">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className=" flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{blogData?.title}</h1>
              <h2 className="font-light">Author: {blogData?.author}</h2>
              <h2 className="font-light">
                Created At:{" "}
                <time>
                  {format(Date(blogData?.createdAt), "MMM d, yyyy HH:mm")}
                </time>
              </h2>
            </div>
            <div>
              {blogData?.ownerID == user?._id && (
                <div className="flex gap-5">
                  <button onClick={deleteBlog} className="text-2xl">
                    <MdOutlineDeleteOutline className=" hover:text-primary2" />
                  </button>
                  <Link
                    to={`/user/editblog/${blogData?._id}`}
                    className="text-2xl"
                  >
                    <MdOutlineEdit className=" hover:text-primary2" />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <img
            src={blogData?.cover}
            alt={blogData?.cover}
            className="h-64 rounded-lg object-cover"
          />
        </div>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: blogData?.content }}
        ></div>
      </div>
    </>
  );
}
