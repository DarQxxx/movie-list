import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Movie.css'
import './Bootstrap.css'
import { FaStar, FaUserAlt } from 'react-icons/fa'

function Movie () {
  const params = useParams()
  const [movieData, setMovieData] = useState(null)
  const [movieCreditsCrew, setMovieCreditsCrew] = useState(null)
  const [movieCreditsCast, setMovieCreditsCast] = useState(null)

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

        axios
        .get(
          `https://api.themoviedb.org/3/movie/${params.movieId}/credits?api_key=c14c50d17fa9e6d17b2f1d911564ecd4&language=pl`
        )
        .then(res => {
          setMovieCreditsCast(res.data.cast)
          setMovieCreditsCrew(res.data.crew)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  console.log(movieData)
  console.log(movieCreditsCast)
  console.log(movieCreditsCast)
  if (movieData !== null && movieCreditsCrew !== null && movieCreditsCast !==null)
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
            <div className='movie__desc__titleRelease'>
              <div className='movie__desc__titleRelease__orginaltitle'>
                {movieData.original_title}
              </div>
              <div className='movie__desc__titleRelease__release'>
                {movieData.release_date.slice(0, 4)}
              </div>
            </div>
            <div className='movie__desc__votes'>
              <div className='movie__desc__votesAverage'>
              <div className='movie__desc__votesAverage--icon ml-5px'>
                  <FaStar />
                </div>
                {movieData.vote_average}{' '}

              </div>
              <div className='movie__desc__votesCount ml-10px'>
                {movieData.vote_count} ocen

              </div>
            </div>
          </div>
        </div>
        <div className='movie__bot'>
          <div className='movie__info'>
            <div className='movie__info__image'>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}
              />
            </div>
            <div className="movie__info__overview ml-35px">
            <div className='movie__info__overviewDesc '>{movieData.overview}</div>
            <div className="movie__info__overviewDirecting">{movieCreditsCrew.map((movie, index) => (<div>e</div>))}</div>
            </div>
            
          </div>
        </div>
      </div>
    )
  else return <div></div>
}

export default Movie
