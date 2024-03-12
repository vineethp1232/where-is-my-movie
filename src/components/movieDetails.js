import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";
import "./movieDetails.css";
import MoviePage from "./MoviePage";
function MovieDetails({ movies, getWatchList, watchlist, isFromWatchlist }) {
  const { id } = useParams();
  const myMovieList = isFromWatchlist ? watchlist : movies.result;
  const myMovie = myMovieList.filter((item) => item.imdbId === id)[0];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div>
      <div className="detail-button-container">
      <MoviePage myMovie={myMovie}/>
      
        <button
          className="button2 watchlist-button"
          onClick={() => getWatchList(myMovie, isFromWatchlist)}
        >
          {watchlist.some((element) => element.imdbId === myMovie.imdbId)
            ? "Remove from Watchlist"
            : "Add To Watchlist"}
        </button>
        </div>
      {isFromWatchlist === false && (
        <div className="related">
          <h3 className="related-text">Related Films</h3>
          <div className="newCard">
            <Card
              data={movies.result.filter(
                (movie) => movie.imdbId !== myMovie.imdbId
              )}
              linkRoute="/movies"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
