import React, { useState } from 'react'
import "./navbar.css"
import { Link } from "react-router-dom"
function Index({ handleSearch, watchlist }) {

  const [search, setSearch] = useState("")
  function handleInputChange(event) {
    setSearch(event.target.value)
  }
  function getSearch() {
    handleSearch(search)
     setSearch("")
  }
  return (
    <div className='nav'>
      <h1><Link to="./">Where Is My Movie</Link></h1>
  
        <div className='search'>
          <input type="text" placeholder='find my movie' onChange={handleInputChange} className='search-box'></input>
          <button onClick={getSearch} type="submit" className='search'><Link to="/">search</Link></button>
        </div>
        <Link to="/watchlist"><div className='watchlist_container'>
          <span className="material-symbols-rounded" id="watchlist">
            desktop_windows</span>
          {watchlist.length!==0 &&<div className='watch-length'>{watchlist.length}</div>}
          <div className="watchlist-text">watchlist</div>
        </div></Link>
      
    </div>
  )
}

export default Index
