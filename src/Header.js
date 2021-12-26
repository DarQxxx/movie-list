import React from 'react'
import "./Header.css"
import "./Bootstrap.css"
import {FaSignInAlt, FaFacebook, FaSearch} from "react-icons/fa";
function Header({scrollHeight}) {
    return (
        <div className={`header`} >
            <div className="header__logo">
            MOVIELIST</div>
            <div className="header__input ml-25px"><div className="header__inputIcon"><FaSearch/></div><input  type="text" placeholder='Szukaj filmów, których pożądasz' /></div>
            <div className="header__fbLog ml-25px"><div className="header__fbLogIcon"><FaFacebook/></div>Zaloguj się kontem Facebook</div>
            <div className="header__Log ml-10px"><div className="header__LogIcon"><FaSignInAlt/></div>Zaloguj się</div>

        </div>
    )
}

export default Header
