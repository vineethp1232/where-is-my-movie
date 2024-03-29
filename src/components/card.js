import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
function Card(props) {
  const element = props.data.map((item) => {
    const backgroundImage = item.backdropURLs[780];
    
    return (
      <Link key={item.imdbId} to={`${props.linkRoute}/${item.imdbId}`} >
        
        <div
          className="card"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="card-content">
            <div className="icons">
              <img src={item.posterURLs[92]} alt="" className="img"></img>
            </div>
            <div className="info">
              <h1>{item.title}</h1>
              <h4>
                {item.year}, {item.directors[0]}
              </h4>
              <span className="minutes">{item.runtime} mins</span>
              <p>
                {item.genres.map((genre) => {
                  return (
                    <span style={{ paddingRight: "1vw" }} key={genre.id}>{genre.name}</span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return <div className="cards">{element}</div>;
}

export default Card;
