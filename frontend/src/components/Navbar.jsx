import React, { useContext } from "react";
import Button from "./Button";
import { Usercontext } from "../context/Usecontext";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(Usercontext);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      localStorage.removeItem("token"); // Clear token
      window.location.reload(); // Reload page to reset authentication state
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };
  

  return (
    <nav className="flex justify-between items-center text-gray-300 py-4 px-6 shadow-md">
      {/* Left Section: Logo & Title */}
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 transition"
        >
          <path
            fillRule="evenodd"
            d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-xl font-semibold tracking-wide">ImageGen</h3>
      </div>

      {/* Right Section: Dashboard & Avatar */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:text-red-600 hover:border-red-600 transition"
        >
          Logout
        </button>
       <Link to={"create"}>
        <Button className="px-4 py-2 text-green-500 border border-green-500 rounded-lg hover:text-green-600 hover:border-green-600 transition">
          Dashboard
        </Button>
        </Link>
        <img
          className="h-10 w-10 rounded-full border-2 border-black shadow-lg"
          src={user?.avatar || "https://via.placeholder.com/40"}
          alt="User Avatar"
        />
      </div>
    </nav>
  );
};

export default Navbar;
