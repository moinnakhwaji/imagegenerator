import React, { useContext, useEffect, useState } from "react";
import { Usercontext } from "../context/Usecontext";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Userimage = () => {
  const [images, setImages] = useState([]);
  const { user, open, setiSopen } = useContext(Usercontext);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_BACKEND_KEY}/api/images/${user._id}`, {
          withCredentials: true,
        });

        if (response.data?.success) {
          setImages(response.data.images || []);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (user?._id) {
      fetchImages();
    }
  }, [user?._id]);

  return (
    <div className="flex">
      {open && <Sidebar />}
      <div className="p-6 flex-1">
        <button onClick={() => setiSopen(!open)} className="mb-4 p-2 bg-gray-800 text-white rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        </button>
        <h1 className="text-4xl font-bold text-center mb-6 uppercase">User Created Images</h1>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {images.map((item) => (
              <div key={item._id} className="overflow-hidden rounded-lg shadow-lg">
                <Link to={`${item._id}`}>
                  <img
                    src={item.base64}
                    alt="User upload"
                    className="w-full h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No images available</p>
        )}
      </div>
    </div>
  );
};

export default Userimage;
