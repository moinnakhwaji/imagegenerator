import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Usercontext } from "../context/Usecontext";
import Sidebar from "../components/Sidebar";

const Singleimage = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { open, setiSopen } = useContext(Usercontext);

    useEffect(() => {
        if (!id) return;

        const fetchSingleimage = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_BACKEND_KEY}/api/image/${id}`, {
                    withCredentials: true,
                });

                if (response?.data) {
                    setImage(response.data?.base64Image);
                }
            } catch (error) {
                setError("Failed to load image.");
            } finally {
                setLoading(false);
            }
        };

        fetchSingleimage();
    }, [id]);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className={`transition-all duration-300 ${open ? "w-64" : "w-0"} overflow-hidden`}>
                {open && <Sidebar />}
            </div>

            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setiSopen(!open)}
                className={`fixed top-4 ${open ? "left-72" : "left-4"} p-2 bg-gray-800 text-white rounded-lg z-50 transition-all`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-panel-left"
                >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M9 3v18"></path>
                </svg>
            </button>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 text-gray-300">
                <h1 className="text-xl font-semibold">Download the Image</h1>

                {loading && <p className="text-lg">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {image && (
                    <div className="flex flex-col items-center gap-3">
                        <img 
                            src={image} 
                            alt={`Image-${id}`} 
                            className="max-w-[250px] h-auto rounded-md shadow-md"
                        />

                        {/* Additional Text Content */}
                        <p className="text-sm text-gray-400 italic">
                            "A picture is worth a thousand words."
                        </p>
                        <p className="text-sm text-gray-300 text-center">
                            Click the button below to download the high-resolution image. 
                            Save and share it as you like!
                        </p>

                        <a 
                            href={image} 
                            download={`image-${id}.png`} 
                            className="px-4 py-2 text-black bg-white rounded-md hover:bg-gray-300 transition"
                        >
                            Download Image
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Singleimage;
