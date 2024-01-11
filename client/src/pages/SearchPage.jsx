import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import StudentSearchComponent from "../components/StudentSearchComponent";
import UnivSearchComponent from "../components/UnivSearchComponent";
import FacultySearchComponent from "../components/FacultySearchComponent";
import { UserContext } from "../components/UserContext";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { user } = useContext(UserContext);
  const [studentData, setStudentData] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [universityData, setUniversityData] = useState([]);

  useEffect(() => {
    axios.get(`/api/search?q=${query}`).then((res) => {
      const users = res.data;
      console.log(users);
      setStudentData(users.Studentusers);
      setFacultyData(users.Facultyusers);
      setUniversityData(users.Univusers);
    });
  }, [query]);
  console.log(studentData);
  return (
    <>
      <div className="flex w-full flex-col gap-5  p-10">
        <label className=" flex items-center gap-1 rounded-lg border-2 border-primary2 bg-gray-900 p-2">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="h-full w-full bg-transparent text-lg font-semibold tracking-wide text-white outline-none"
          />
          <button className="rounded-full bg-primary2 p-2 text-2xl text-white">
            <FaSearch />
          </button>
        </label>
        <div className="flex h-full flex-col rounded-lg border-2 border-primary2 tracking-wide text-white">
          <StudentSearchComponent studentData={studentData} owner={user} />
          <UnivSearchComponent univData={universityData} owner={user} />
          <FacultySearchComponent facultyData={facultyData} owner={user} />
        </div>
      </div>
    </>
  );
}
