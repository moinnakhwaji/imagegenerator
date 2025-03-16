import React, { useContext, useState } from "react";
import PromptGenerator from "../components/Giminiapi";
import axios from "axios";
import { Usercontext } from "../context/Usecontext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CreateImage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, open, setiSopen } = useContext(Usercontext);
  const navigate = useNavigate();

  const handleGeneratePrompt = async () => {
    setLoading(true);
    try {
      const prompt = await PromptGenerator();
      setGeneratedPrompt(prompt);
    } catch (error) {
      console.error("Error generating prompt:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setGeneratedPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (generatedPrompt.length < 15) return;
    
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_BACKEND_KEY}/api/create`,
        {
          prompt: generatedPrompt,
          userId: user?._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response) {
        setGeneratedPrompt("");
        navigate(`/userimage`);
      }
    } catch (error) {
      console.error("Error submitting prompt:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${open ? "w-64" : "w-0"} overflow-hidden`}>
        {open && <Sidebar />}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setiSopen(!open)}
          className="mb-4 p-2 bg-gray-800 text-white rounded-lg"
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

        {/* Image Creation Section */}
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <h1 className="text-4xl font-extrabold tracking-wide mb-6">
            Create New Image
          </h1>
          <div className="w-full max-w-lg space-y-6 bg-opacity-50 backdrop-blur-md p-6 rounded-lg">
            {/* Image Title Input */}
            <div>
              <label className="block text-lg font-medium mb-2 tracking-wide">
                Image Title
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={generatedPrompt}
                className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGeneratePrompt}
                disabled={loading}
                className={`flex items-center gap-2 px-5 py-3 text-lg font-semibold rounded-md shadow-md transition duration-200 
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-white text-black hover:bg-gray-200"}`}
              >
                {loading ? "Generating..." : "Generate Prompt"}
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || generatedPrompt.length < 15}
                className={`px-5 py-3 font-semibold rounded-md shadow-md transition duration-200
                  ${loading || generatedPrompt.length < 15 ? "bg-gray-400 cursor-not-allowed" : "bg-white text-black hover:bg-gray-200"}`}
              >
                {loading ? "Creating..." : "Create Image"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImage;
