import React, { useState } from "react";  
import Navbar from "react-bootstrap/Navbar";  
import Nav from "react-bootstrap/Nav";  
import { Link, useHistory } from "react-router-dom";
import "./TopBar.css";

function Header({ location }) {  
  const [keyword, setKeyword] = useState('');
  let history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
        pathname: '/ImageSearchPage',
        search: `?q=${keyword}`,
    });
  }

  const handleChangeKeyWord = (val) => {
    setKeyword(val);
  }

  return (
      <nav className="topbar">
          <div className="topbar__logo">
              <a href="#home" className="topbar__logo-txt">NASA:IMG</a>
          </div>
          <div className="topbar__tab">
              <ul className="topbar__tab-wrapper">
                  <li className="topbar__tab-item"><Link to='/' >Home</Link></li>
                  <li className="topbar__tab-item"><Link to='/ImageSearchPage' >Search</Link></li>
                  <li className="topbar__tab-item"><Link to='/LikedImagePage' >Liked</Link></li>
                  <li className="topbar__tab-item"><Link to='/RemovedImagePage' >Removed</Link></li>
              </ul>
          </div>
          <div className="topbar__search">
              <form className="fsearch" onSubmit={(e) => handleSubmit(e)}>
                    <div className="fsearch__input">
                        <input type="text" placeholder="Search..." value={keyword} onChange={(e) => {handleChangeKeyWord(e.target.value)}}/>
                    </div>
                    <button  className="fsearch__btn" type="submit">search</button>
              </form>
          </div>
      </nav>
  )
}  

export default Header;