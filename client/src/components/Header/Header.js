import React from 'react'
import "./Header.scss"
import headerImage from "../../assets/images/transparent-meme.png"
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img className= "header__image" src={headerImage}/>
      </Link>
    </div>
  )
}

export default Header