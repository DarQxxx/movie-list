import React, { useEffect, useState, useRef } from 'react'
import "./Header.css"
import "./Bootstrap.css"
import {FaSignInAlt, FaGoogle, FaSearch, FaBars} from "react-icons/fa";
import { Link } from 'react-router-dom';
import {login, logout} from './firebase.js'
import { useSelector } from 'react-redux';
import {dataAction} from "./actions"
import useAxiosAttach from './Hooks/useAxiosAttach';
import axios from 'axios';
function Header() {
    const isLogged = useSelector(state => state.isLogged)
    const userProps = useSelector(state => state.userData)
    const searchBarRef = useRef(null);
    const [searchMovies, setSearchMovies] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [searchValue, setSearchValue] = useState(null);
    const [isHidden, setIsHidden] = useState(true);
    const focusRef = useRef(null)
    
    function handleSearch(){
      if (searchBarRef.current.value.replace(/\s/g, '').length===0)
      setIsEmpty(true);
      else
      setIsEmpty(false);
      setSearchValue(searchBarRef.current.value)
      
    }

    function handleClickOutside(e) {

      
      if (!focusRef.current.contains(e.target)) setIsHidden(true)
  }

    useEffect(() => {
        if (isEmpty){
          axios
            .get(
              `https://api.themoviedb.org/3/movie/now_playing?api_key=c14c50d17fa9e6d17b2f1d911564ecd4&language=pl`
            )
            .then(res => {
              setSearchMovies(res.data.results.slice(0,3))
              
            })
            .catch(err => {
              console.log(err)
            })
          }
          else
          axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=c14c50d17fa9e6d17b2f1d911564ecd4&query=${searchBarRef.current.value}&language=pl`
          )
          .then(res => {
            setSearchMovies(res.data.results.slice(0,3))
            
            
          })
          .catch(err => {
            console.log(err)
          })
    
        return () => {
          setSearchMovies([])
        }
      }, [searchValue])

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    }, [])


    return (
        <div className={`header`} >
            <div className="header__logo">
            <Link to="/">MOVIELIST</Link></div>
            <div ref={focusRef} className="header__searchSection"><div className="header__input ml-25px header__rwd--hide"><div className="header__inputIcon"><FaSearch/></div><input onFocus={() => {setIsHidden(false)}}className="header__inputField" ref={searchBarRef} type="text" placeholder='Szukaj filmów, których pożądasz'  onChange={handleSearch}/>
            </div>
            <div className="header__input__list">
            {searchMovies.map((movie, index) => (
              <div className="header__input__list--underline" key={index} style={{display: isHidden && "none"}}>
                <Link onClick={() => {setIsHidden(true); searchBarRef.current.value="";setIsEmpty(true); setSearchValue(searchBarRef.current.value)}} to={`/${movie.id}`} >
                <div className="header__input__listContent">
                <img src={movie.poster_path === null ? `https://dummyimage.com/92x130/000/fff&text=No+image` : `https://image.tmdb.org/t/p/w92/${movie.poster_path}`}/>
                
                <div className="header__input__listDesc">
                <span className="header__input__listDesc--title">{movie.title.slice(0,34)}{movie.title.length>34 && `...`}</span>
                <span className="header__input__listDesc--overview">{movie.overview.slice(0,60)}{movie.overview.length>60 && `...`}</span>
                </div>

                </div>

                </Link>


              </div>
            
            
              
            ))}
            </div>
            
            </div>
           {!isLogged && <div className="header__fbLog ml-25px header__rwd--hide" onClick={()=>{login()}}><div className="header__fbLogIcon"><FaGoogle/></div>Zaloguj się kontem Google</div>} 
           {!isLogged &&<div className="header__Log ml-10px header__rwd--hide"><div className="header__LogIcon"><FaSignInAlt/></div>Zaloguj się</div>}
           {isLogged && <div className="header__Logout header__rwd--hide" onClick={() => {logout()}}>Wyloguj</div>}
            <div className="header__iconsRwd header__rwd--show">
                <div className="header__iconsRwdLog"><FaSignInAlt/></div>
                <div className="header__iconsRwdBurger"><FaBars/></div>
                </div>

        </div>
    )
}

export default Header
