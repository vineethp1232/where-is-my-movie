import React from 'react'
import Card from '../card'

function Watchlist({filteredMovies}) {

  return (
    <div>
      <h2>My Watchlist</h2>
      <Card data={filteredMovies} linkRoute="/watchlist" />
    </div>
  );
}

export default Watchlist;
