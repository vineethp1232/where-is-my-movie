import React, { useState,useRef } from 'react'
import "./navbar.css"
import { Link,useNavigate } from "react-router-dom"
function Index({ handleSearch, watchlist }) {
  const Inputref=useRef(null)
  const [search, setSearch] = useState("")
  const navigate=useNavigate();
  function handleInputChange(event) {
    setSearch(event.target.value)
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    handleSearch(search)
     setSearch("")
     navigate('/');
     Inputref.current.focus();
  }
  return (
    <div className='nav'>
      <h1><Link to="./">Where Is My Movie</Link></h1>
  
        <div className='search'>
          <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder='find my movie' value={search} onChange={handleInputChange} className='search-box' ref={Inputref}></input>
          <button onClick={handleFormSubmit} type="submit" className='search'>search</button>
          </form>
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
