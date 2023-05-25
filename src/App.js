import React, { useState } from "react";
import Navbar from "./Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Watchlist from "./Navbar/watchlist";
import Home from "./home";
import MovieDetails from "./movieDetails";

function App() {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState(null);
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const navigate = useNavigate();

  function getWatchList(movie, isFromWatchlist) {
    const updatedWatchlist = [...filteredMovies];
    const index = updatedWatchlist.findIndex((item) => item.imdbId === movie.imdbId);

    if (index !== -1) {
      // Movie is already in watchlist, so remove it
      updatedWatchlist.splice(index, 1);
      if (isFromWatchlist) {
        navigate("/watchlist");
      }
    } else {
      // Movie is not in watchlist, so add it
      updatedWatchlist.push(movie);
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  }

  function handleSearch(movie) {
    setSearchMovie(movie);
    localStorage.removeItem("movieData");
  }

  function getMovies(data) {
    setMovies(data);
  }

  const filteredMovies = [];
  const imdbids = {};

  for (const movie of watchlist) {
    if (!imdbids[movie.imdbId]) {
      imdbids[movie.imdbId] = true;
      filteredMovies.push(movie);
    }
  }

  return (
    <div className="App">
      <Navbar handleSearch={handleSearch} watchlist={watchlist} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home searchMovie={searchMovie} getMovies={getMovies} movies={movies} />}
        />
        <Route
          exact
          path="/watchlist"
          element={<Watchlist watchlist={watchlist} movies={movies} getWatchList={getWatchList} filteredMovies={filteredMovies} />}
        />
        <Route
          exact
          path="/watchlist/:id"
          element={<MovieDetails movies={movies} getWatchList={getWatchList} watchlist={filteredMovies} isFromWatchlist={true} />}
        />
        <Route
          path="/movies/:id"
          element={<MovieDetails movies={movies} getWatchList={getWatchList} watchlist={filteredMovies} isFromWatchlist={false} />}
        />
      </Routes>
    </div>
  );
}

export default App;
