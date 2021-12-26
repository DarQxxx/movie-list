import React, { useEffect, useState } from 'react'
import "./Baner.css"
import useAxios from './Hooks/useAxios'

function Baner() {
    const [popularData, setPopularData] = useAxios("/popular", "")
    const [mainMovie, setMainMovie] = useState(0)
    
    useEffect(() => {
        setMainMovie(2)
        return () => {
            setMainMovie(0)
        }
    }, [])

    console.log(mainMovie)

    if (popularData.length !== 0)
    return (
        <div className="baner">
            <div className="baner__desc">
                <div className="baner__desc__info">
                    <div className="baner__desc__infoTitle">
                        {popularData.results[mainMovie].original_title}
                    </div>
                    <div className="baner__desc__infoDesc">
                        {popularData.results[mainMovie].overview.slice(0, 150) + "..."}
                    </div>
                </div>

                <div className="baner__descBgimg" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${popularData.results[mainMovie].backdrop_path})`}}>
                </div>
            </div>
            <div className="baner__topMovies">
            {popularData.results.slice(0,5).map((movie, index) => (
                <div onClick={() => {setMainMovie(index)}} className="baner__topMoviesImgs" key={index}>
                    <img  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
                </div>
            ))}
            </div>            
        </div>
    )
    else return (<div></div>)

}
//https://image.tmdb.org/t/p/w500/3eVpNCMoi3C8lA0F0n2retnwvCK.jpg
export default Baner 
