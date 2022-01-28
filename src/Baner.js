import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Baner.css"
import useAxiosAttach from './Hooks/useAxiosAttach'
import "./Bootstrap.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link} from 'react-router-dom'

function Baner() {
    const [page, setPage] = useState(1)
    const popularData = useAxiosAttach("/popular", `&page=${page}`)
    const [mainMovie, setMainMovie] = useState(0)
    const [counter, setCounter] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [actualMovieId, setActualMovieId] = useState(null)
    const [actualMovieData, setActualMovieData] = useState([])


    
    useEffect(() => {
        setMainMovie(0)
        return () => {
            setMainMovie(0)
        }
    }, [])

    useEffect(() => {
        if (popularData.length > 0 && popularData.length <= 20)
        setActualMovieId(popularData[0].id)

    }, [popularData.length])


    useEffect(() => {
        if(actualMovieId !==null){
            axios
            .get(
            `https://api.themoviedb.org/3/movie/${actualMovieId}?api_key=c14c50d17fa9e6d17b2f1d911564ecd4&language=pl`
            )
            .then(res => {
                setActualMovieData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
      }, [actualMovieId])


    function handleNextBtn(){
        if (!isClicked){
            setIsClicked(true)
            setCounter(counter+1);
            setTimeout(() => {setIsClicked(false)}, 400);
            if (counter >= (popularData.length - 6)){
                setPage(page+1);
            }
        }
    }


    function handlePrevBtn(){

        if (!isClicked){
            setIsClicked(true)
            if (counter > 0){
                setCounter(counter-1);
                setTimeout(() => {setIsClicked(false)}, 400);
            }
        }

    }


    if (popularData.length !== 0 && actualMovieData.length !== 0)
    return (
        <div className="baner">
            <div className="baner__desc">
                <div className="baner__desc__info">
                    <div className="baner__desc__infoTitle">
                        {actualMovieData.title}
                    </div>
                    <div className="baner__desc__infoProperties">
                        <div className="baner__desc__infoProperties__originalTitle">{actualMovieData.original_title}</div>
                        {actualMovieData.runtime !== 0 ? (<div className="baner__desc__infoProperties__runtime ml-20px">{`${Math.floor(actualMovieData.runtime/60)} godz. ${actualMovieData.runtime - (Math.floor(actualMovieData.runtime/60) * 60)} min.`}</div>) : (<div className="baner__desc__infoProperties__runtime ml-20px">? godz. ? min.</div>)}
                        <div className="baner__desc__infoProperties__year ml-20px">{actualMovieData.release_date.slice(0, 4)}</div>
                    </div>
                   {actualMovieData.overview !== "" && <div className="baner__desc__infoDesc">
                        {actualMovieData.overview.slice(0, 150) + "..."}
                    </div>}
                </div>

                <div className="baner__descBgimg" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w780/${actualMovieData.backdrop_path})`}}>
                </div>
            </div>
            <div className="baner__topMovies" >
            {popularData.map((movie, index) => (
                <div style={{transform: `translateX(${-223 * counter}px)`}} className="baner__topMoviesImgs" key={index}>
                    <img onClick={() => {setActualMovieId(movie.id)}} className={movie.id === actualMovieId ? "baner__topMoviesImgs--border" : "" }  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
                    <div className="baner__topMoviesImgs__bottomTitle"><Link to={`/${movie.id}`} >{movie.title}</Link></div>
                </div>
            ))}
            
            {counter > 0 &&  <div className="baner__topMovies__prevBtn" onClick={handlePrevBtn}><FaChevronLeft/></div> }
            <div className="baner__topMovies__nextBtn" onClick={handleNextBtn}><FaChevronRight/></div>
            </div>            
        </div>
    )
    else return (<div></div>)

}

export default Baner 
