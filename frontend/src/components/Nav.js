import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../img/logo.png';

/**
 * Nav component will mount NavBar when rendered to the DOM.
 * @namespace Nav
 * @return {string} JSX element
 */
const Nav = () => {
  return (
    <nav className="main-nav">
      {/* <img className='' src={imgLogo}></img> */}
      <ul>
        <li><NavLink to="/search/all-images"><i class="fa fa-picture-o pl-2 delete_icon"></i>  All Images</NavLink></li>
        <li><NavLink to="/search/favourite"><i class="fa fa-star pl-2 fav_icon_active"></i>  Favourites</NavLink></li>
        {/* <li><NavLink to="/search/create">Upload</NavLink></li> */}
      </ul>
    </nav>
  )
};

export default Nav;