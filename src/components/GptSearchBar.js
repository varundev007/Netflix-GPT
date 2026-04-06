import React, { useReducer, useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const handleGptSearchClick = async () => {
   // console.log(searchText.current.value);
    //Make an API call to GPT API and get movie Results
    const gptquery =
      "Act as movie recommendation system and suggest some movies for the query " +
      searchText.current.value +
      ".only give me the names of 5 movies, comma sperated like the example result given ahead. Example results: Dhurandhan, kite, sholay, pink, gadar";
    const gptResults = await openai.responses.create({
      model: "gpt-4.1-nano",
      input: gptquery,
    });

    console.log(gptResults.output_text); //Baby, Tiger Zinda Hai, D-Day, Ek Tha Tiger, War
    const gptMovies = gptResults.output_text.split(","); //[Baby, Tiger Zinda Hai, D-Day, Ek Tha Tiger, War]
    //For each movie searching it using tmdb api
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //[promise1, promise2, promise3, promise3,promise4, promise5] . searchMoviesTMDB is async fun and returning promise.
    const tmdbResults = await Promise.all(promiseArray); //program awaiting to get all promise resollved
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
    );
  };

  //Search movie in TDDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false",
      API_OPTIONS,
    );
    const json = await data.json();
    return json.results;
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
