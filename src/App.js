import React, { useState ,useCallback} from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Watchlist from "./components/watchlist";
import Home from "./components/home";
import MovieDetails from "./components/movieDetails";
import RecommendedMovies from "./utils/Recommended";

function App() {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState(RecommendedMovies);
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
    localStorage.removeItem("movies");
  }

  const getMovies = useCallback((data) => {
    setMovies(data);
  }, []);

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
          element={<Home searchMovie={searchMovie} getMovies={getMovies} movies={movies} handleSearch={handleSearch}/>}
        />
        <Route
          exact
          path="/watchlist"
          element={<Watchlist  filteredMovies={filteredMovies} />}
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
