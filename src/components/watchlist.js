import React from 'react'
import Card from './card'

function Watchlist({filteredMovies}) {
console.log(filteredMovies)
  return (
    <div>
      <h2>My Watchlist</h2>
      <Card data={filteredMovies} linkRoute="/watchlist" />
    </div>
  );
}

export default Watchlist;
