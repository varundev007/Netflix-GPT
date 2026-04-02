import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div>
      <div className="-mt-52 relative z-20">
        <MoviesList title={"Now Playing"} movies={movies.addNowPlayingMovies} />
        <MoviesList title={"Top Rated"} movies={movies.addTopRatedMovies} />
        <MoviesList title={"Popular"} movies={movies.addPopularMovies} />
        <MoviesList
          title={"Upcoming Movies"}
          movies={movies.addUpcomingMovies}
        />
        <MoviesList title={"Horror"} movies={movies.addNowPlayingMovies} />
      </div>
      {/*
        MovieList - Popular
          Cards * n
        MoviesList - now playing
        MovieList - Treding
        movieList - Horror
      */}
    </div>
  );
};

export default SecondaryContainer;
