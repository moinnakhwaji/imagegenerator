import React, { useContext } from 'react';
import { Usercontext } from '../context/Usecontext';
import menuItems from './DataofSidebar';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const { open } = useContext(Usercontext);


  if (!open) return null;

  return (
    <div className="w-64 min-h-screen bg-[#141414] text-white p-5 flex flex-col space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Image Gen</h1>
        <h3 className="text-gray-400">AI Image Generator</h3>
      </div>
      
      <Link to={"/create"}>
        <button className="w-full flex items-center justify-center gap-2 bg-white text-[#141414] font-semibold py-2 rounded-lg transition-transform transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
          </svg>
          Create New Image
        </button>
      </Link>

      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-lg cursor-pointer transition">
            {item.icon}
            <Link to={item?.link}>
            <span className="text-white font-medium">{item.name}</span>  
            </Link>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
