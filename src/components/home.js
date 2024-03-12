import React, { useEffect, useState } from "react";
import Card from "./card";
import "./home.css";
import Shimmer from "./Shimmer";


function Home({ searchMovie, getMovies, movies }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies"));
    if (savedMovies) {
      getMovies(savedMovies);
    }
  }, [getMovies]);

  useEffect(() => {
    if (searchMovie !== "") {
      setLoading(true); // Set loading to true when starting a new search
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
        .catch((error) => console.error(error))
        .finally(() => setLoading(false)); // Set loading to false when API call completes
    }
  }, [searchMovie, getMovies]);

  return (
    <div className="cards">
      {loading ? <Shimmer /> :
      <div>
      <h2>{movies.result.length===10?"Recommended Movies":"Results"}</h2>
       <Card data={movies.result} linkRoute="/movies" />
       </div>
       } 
      
    </div>
  );
}

export default Home;
