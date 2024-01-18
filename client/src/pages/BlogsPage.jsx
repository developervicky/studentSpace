import axios from "axios";
import { useEffect, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("/api/blogsData").then((res) => {
      setBlogs(res.data);
    });
  }, []);
  console.log(blogs);
  return (
    <>
      <div className="my-10 flex grow flex-col gap-4 rounded-lg border-2 border-primary2 px-6 py-4 tracking-wide text-white">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold tracking-wide md:text-2xl">
            Blogs
          </h1>
          <Link
            to={"/user/addblog"}
            className="flex items-center gap-2 rounded-lg border-2 border-primary3 p-2 hover:bg-primary3"
          >
            <LuPlusCircle />
            <p>Add New Blog</p>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {blogs &&
            blogs.map((blog, index) => (
              <Link
                to={`/user/blogs/${blog._id}/blog`}
                key={index}
                className="flex h-fit items-center gap-4 overflow-hidden rounded-lg border-2 border-primary3 "
              >
                <img
                  className="h-48 w-80  object-cover"
                  src={blog.cover}
                  alt={blog.cover}
                />

                <div className="flex flex-col gap-2 px-4 pr-8">
                  <div>
                    <h1 className="text-lg font-semibold">{blog.title}</h1>
                    <p className="text-sm font-light">{blog.author}</p>
                  </div>
                  <div className="text-justify text-sm">
                    <p>{blog.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
