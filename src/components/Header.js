// Components
import React from 'react';
import { Link } from 'react-router-dom';

// Img
import logo from '../logo.png';

// Stylesheets
import '../stylesheets/Header.css';

export const Header = () => {
    return (
        <div id="headerContainer">
            <Link to="/">
                <img src={logo} alt="logo"/>
            </Link>
        </div>
    )
}

export default Header;