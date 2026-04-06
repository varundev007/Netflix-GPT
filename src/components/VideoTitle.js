import React from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="flex items-center gap-4 mt-4">
        {/* Play Button */}
        <button
          className="flex items-center gap-3 bg-white text-black px-3 md:px-6 py-1  md:py-3 text-lg font-semibold rounded-md 
hover:bg-gray-100 hover:scale-105 hover:shadow-lg 
active:scale-95 transition-all duration-150 ease-out"
        >
          <FaPlay size={18} />
          Play
        </button>

        {/* More Info Button */}
        <button
          className="hidden md:inline-block md:flex items-center gap-3 bg-gray-600 bg-opacity-70 text-white px-6 py-3 text-lg font-semibold rounded-md 
hover:bg-opacity-90 hover:scale-105 hover:shadow-lg 
active:scale-95 transition-all duration-150 ease-out"
        >
          <AiOutlineInfoCircle size={22} />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
