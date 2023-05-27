import React, { useEffect } from "react";
import Card from "./card";
import "./home.css";
function Home({ searchMovie, getMovies, movies, handleSearch }) {
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies"));
    if (savedMovies) {
      getMovies(savedMovies);
    }
  }, [getMovies]);

  useEffect(() => {
    if (searchMovie !== null){
      fetch(
        `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchMovie}&country=In&show_type=movie&output_language=en`,
        {
          method: "GET",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          getMovies(data);
          localStorage.setItem("movies", JSON.stringify(data));
        })
        .catch((error) => console.error(error));
  }}, [searchMovie, getMovies]);

  return (
    <div className="cards">
      {movies && <h2>Results</h2>}
      {movies && <Card data={movies.result} linkRoute="/movies" />}
    </div>
  );
}

export default Home;
