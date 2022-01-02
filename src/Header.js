import React from 'react'
import "./Header.css"
import "./Bootstrap.css"
import {FaSignInAlt, FaFacebook, FaSearch, FaBars} from "react-icons/fa";
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div className={`header`} >
            <div className="header__logo">
            <Link to="/">MOVIELIST</Link></div>
            <div className="header__input ml-25px header__rwd--hide"><div className="header__inputIcon"><FaSearch/></div><input  type="text" placeholder='Szukaj filmów, których pożądasz' /></div>
            <div className="header__fbLog ml-25px header__rwd--hide"><div className="header__fbLogIcon"><FaFacebook/></div>Zaloguj się kontem Facebook</div>
            <div className="header__Log ml-10px header__rwd--hide"><div className="header__LogIcon"><FaSignInAlt/></div>Zaloguj się</div>
            <div className="header__iconsRwd header__rwd--show">
                <div className="header__iconsRwdLog"><FaSignInAlt/></div>
                <div className="header__iconsRwdBurger"><FaBars/></div>
                </div>

        </div>
    )
}

export default Header
