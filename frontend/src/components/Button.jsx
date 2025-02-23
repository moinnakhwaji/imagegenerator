import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200 transition"
    >
      {children || "Button"}
    </button>
  );
};

export default Button;
