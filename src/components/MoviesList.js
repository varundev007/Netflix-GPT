import React, { useRef, useState } from "react";
import MoviesCard from "./MoviesCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MoviesList = ({ title, movies }) => {
  //
  const sliderRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  //

  if (!movies) return null; // 🔥 prevents crash
 // console.log(movies);
  //
  // 👉 Scroll Right
  const handleScrollRight = () => {
    sliderRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
    setShowLeft(true);
  };
  //
  // 👉 Scroll Left
  const handleScrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });

    // Optional: hide left arrow when back at start
    if (sliderRef.current.scrollLeft <= 0) {
      setShowLeft(false);
    }
  };

  return (
    <div className="px-6 py-6 bg-black">
      {/* Title */}
      <h1 className="text-white text-xl md:text-2xl font-semibold mb-4">
        {title}
      </h1>

      {/* Movie Row */}
      <div className="relative group">
        {/* LEFT ARROW */}
        {showLeft && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-0 h-full z-30 px-3 bg-black bg-opacity-60 text-white text-2xl hidden group-hover:block"
          >
            <FaChevronLeft size={20} />
            {/* Above is just icon with size 20 */}
          </button>
        )}

        {/* SCROLL CONTAINER */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide space-x-5 scroll-smooth"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[160px] md:min-w-[180px] transition-all duration-300 ease-in-out 
                         hover:scale-110 hover:z-20 hover:shadow-2xl"
            >
              <MoviesCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={handleScrollRight}
          className="absolute right-0 top-0 h-full z-30 px-3 bg-black bg-opacity-60 text-white text-2xl hidden group-hover:block"
        >
          <FaChevronRight size={20} />
          {/* Above is just icon with size 20 */}
        </button>

        {/* Gradient Fade */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black"></div>
        <div className="pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black"></div>
      </div>
    </div>
  );
};

export default MoviesList;
