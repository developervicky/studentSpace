import { LuPlusCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function BlogsPage() {
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
          <div className="border-2 border-primary3"></div>
        </div>
      </div>
    </>
  );
}
