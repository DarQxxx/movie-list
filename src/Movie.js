import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Movie.css'

function Movie () {
  const params = useParams()
  const [movieData, setMovieData] = useState(null)

  useEffect(() => {
    if (params.movieId !== null) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=c14c50d17fa9e6d17b2f1d911564ecd4&language=pl`
        )
        .then(res => {
          setMovieData(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  console.log(movieData)
  if (movieData !== null)
    return (
      <div className='movie'>
        <div className='movie__top'>
          <div
            className='movie__bg'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movieData.backdrop_path})`
            }}
          ></div>
          <div className='movie__desc'>
            <div className='movie__descTitle'>{movieData.title}</div>

            <div className='movie__descOrginaltitle'>
              {movieData.original_title}
            </div>
            <div className='movie__descRelease'>
              {movieData.release_date.slice(0, 4)}
            </div>
            <div className='movie__descVoteaverage'>
              {movieData.vote_average} / 10
            </div>
            <div className='movie__descVotecount'>{movieData.vote_count}</div>
          </div>
        </div>
        <div className="movie__bot">
            <div className="movie__info">
            <div className="movie__info__image">
                <img src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}/>
            </div>
            <div className="movie__info__overview">
                    {movieData.overview}
                </div>
            </div>

            </div>
      </div>
    )
  else return <div></div>
}

export default Movie
