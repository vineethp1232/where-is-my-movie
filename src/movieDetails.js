import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";
import "./movieDetails.css";
function MovieDetails({ movies, getWatchList, watchlist, isFromWatchlist }) {
  const { id } = useParams();

  const myMovie = isFromWatchlist ? watchlist[id] : movies.result[id];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className="top">
      <div className="movie-card">
        <div className="container">
          <img src={myMovie.posterURLs.original} alt="cover" class="cover" />
          <div className="background"></div>
          <div
            className="hero"
            style={{ backgroundImage: `url(${myMovie.backdropURLs.original})` }}
          >
            <div className="details">
              <div className="title1">{myMovie.title}</div>

              <div className="title2">{myMovie.tagline}</div>
              
              <div className="watch">
                <div className="detail_watch">
                <h3 className="year">
                {myMovie.year}, {myMovie.directors[0]}
              </h3>
                  <span className="rating">
                    IMDB rating {myMovie.imdbRating}/100
                  </span>
                  <p>
                    {myMovie.genres.map((genre) => {
                      return (
                        <span style={{ paddingRight: "1vw" }} className="genre">
                          {genre.name}
                        </span>
                      );
                    })}
                  </p>
                </div>
                {myMovie.streamingInfo.in && Object.keys(myMovie.streamingInfo.in).length > 0 ? (
  <a href={Object.values(myMovie.streamingInfo.in)[Object.keys(myMovie.streamingInfo.in).length > 1 ? 1 : 0][0].link} target="_blank" rel="noopener noreferrer">
    <button className="button2" id="watchNow">Watch on {Object.keys(myMovie.streamingInfo.in)[Object.keys(myMovie.streamingInfo.in).length > 1 ? 1 : 0]}</button>
  </a>
) : (
  <p></p>
)}


              </div>
            </div>
          </div>
          <div className="description">
            <div className="column1">
              {myMovie.youtubeTrailerVideoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${myMovie.youtubeTrailerVideoId}`}
                  frameBorder="0"
                  allowFullScreen
                  title={myMovie.title}
                ></iframe>
              ) : (
                <img
                  className="iframe"
                  src={myMovie.backdropURLs.original}
                  alt={myMovie.title}
                />
              )}
            </div>
            <div className="column2">
              <p>{myMovie.overview}</p>
              <div className="cast">
                cast:{" "}
                {myMovie.cast.map((item) => {
                  return <span>{item} | </span>;
                })}
              </div>
              <div className="buttons">
                <button
                  className="button2"
                  onClick={() => getWatchList(myMovie, isFromWatchlist)}
                >
                  {watchlist.some(
                    (element) => element.imdbId === myMovie.imdbId
                  )
                    ? "Remove from Watchlist"
                    : "Add To Watchlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFromWatchlist === false && (
        <div className="related">
          <h3 className="related-text">Results</h3>
          <div className="newCard">
            <Card data={movies.result} linkRoute="/movies" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
