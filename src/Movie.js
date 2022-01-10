import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Movie.css'
import './Bootstrap.css'
import { FaStar, FaUserAlt } from 'react-icons/fa'

import CommentCreate from './CommentCreate'
import Comment from './Comment'

function Movie () {
  const params = useParams()
  const [movieData, setMovieData] = useState(null)
  const [movieCreditsCrew, setMovieCreditsCrew] = useState(null)
  const [movieCreditsCast, setMovieCreditsCast] = useState(null)
  const months = [
    'stycznia',
    'lutego',
    'marca',
    'kwietnia',
    'maja',
    'czerwca',
    'lipca',
    'sierpnia',
    'września',
    'października',
    'listopada',
    'grudnia'
  ]
  const [isShowMore, setIsShowMore] = useState(false)

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

    return () => {
      setIsShowMore(false)
    }
  }, [])

  function handleShowMore () {
    setIsShowMore(!isShowMore)
  }

  console.log(movieData)

  if (
    movieData !== null &&
    movieCreditsCrew !== null &&
    movieCreditsCast !== null
  )
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
          <div className='movie__info movie__info--hideRwd'>
            <div className='movie__info__image'>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}
              />
            </div>
            <div className='movie__info__overview ml-35px'>
              {movieData.overview === '' ? (
                <div className='movie__info__overviewDesc'>
                  Niestety dla tego filmu nie ma opisu w bazie TMDB (The Movie
                  Data Base). Jeśli chcesz dowiedzieć się więcej odwiedź inne
                  miejsce.
                </div>
              ) : (
                <div className='movie__info__overviewDesc '>
                  {movieData.overview.length > 240 ? (
                    <div>
                      {isShowMore
                        ? `${movieData.overview}`
                        : `${movieData.overview.slice(0, 240)}...`}
                      <span
                        className='movie__info__overviewDesc--showMore ml-20px'
                        onClick={handleShowMore}
                      >
                        {isShowMore ? `Pokaż mniej` : `Pokaż więcej`}
                      </span>
                    </div>
                  ) : (
                    <div>{movieData.overview}</div>
                  )}
                </div>
              )}
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-10px'>
                  reżyseria:
                </span>{' '}
                {movieCreditsCrew.map(
                  (movie, index) =>
                    movie.job === 'Director' && (
                      <div
                        className='movie__info__overview__element--next'
                        key={index}
                      >
                        {movie.name}
                        <span className='next'> &nbsp;/&nbsp; </span>
                      </div>
                    )
                )}
              </div>
              {/*<div className="movie__info__overview__element"> <span className="movie__info__overview__element--text mr-10px">scenariusz:</span> {movieCreditsCrew.map((movie, index) => (movie.job === "Screenplay" && <div className="movie__info__overview__element--next" key={index}>{movie.name}<span className="next"> &nbsp;/&nbsp; </span></div>))}</div>*/}
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-10px'>
                  produkcja:
                </span>{' '}
                {movieData.production_countries.map((movie, index) => (
                  <div
                    className='movie__info__overview__element--next'
                    key={index}
                  >
                    {movie.name}
                    <span className='next'> &nbsp;/&nbsp; </span>
                  </div>
                ))}
              </div>
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-10px'>
                  gatunki:
                </span>{' '}
                {movieData.genres.map((movie, index) => (
                  <div
                    className='movie__info__overview__element--next'
                    key={index}
                  >
                    {movie.name}
                    <span className='next'> &nbsp;/&nbsp; </span>
                  </div>
                ))}
              </div>
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-10px'>
                  premiera:
                </span>{' '}
                {`${movieData.release_date.slice(8, 10)} ${
                  months[movieData.release_date.slice(5, 7) - 1]
                } ${movieData.release_date.slice(0, 4)}`}
              </div>
            </div>
          </div>
        </div>

        <div className='movie__bot--showRwd'>
          <div className='movie__info--rwd'>
            <div className='movie__info__imageDesc--rwd'>
              <div className='movie__info__image--rwd'>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}
                />
              </div>

              {movieData.overview === '' ? (
                <div className='movie__info__overviewDesc--rwd'>
                  Niestety dla tego filmu nie ma opisu w bazie TMDB (The Movie
                  Data Base). Jeśli chcesz dowiedzieć się więcej odwiedź inne
                  miejsce.
                </div>
              ) : (
                <div className='movie__info__overviewDesc--rwd '>
                  {movieData.overview.length > 240 ? (
                    <div>
                      {isShowMore
                        ? `${movieData.overview}`
                        : `${movieData.overview.slice(0, 240)}...`}
                      <span
                        className='movie__info__overviewDesc--showMore ml-20px'
                        onClick={handleShowMore}
                      >
                        {isShowMore ? `Pokaż mniej` : `Pokaż więcej`}
                      </span>
                    </div>
                  ) : (
                    <div>{movieData.overview}</div>
                  )}
                </div>
              )}
            </div>

            <div className='movie__info__overview--rwd ml-35px'>
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-20px'>
                  reżyseria:
                </span>{' '}
                {movieCreditsCrew.map(
                  (movie, index) =>
                    movie.job === 'Director' && (
                      <div
                        className='movie__info__overview__element--next'
                        key={index}
                      >
                        {movie.name}
                        <span className='next'> &nbsp;/&nbsp; </span>
                      </div>
                    )
                )}
              </div>
              {/*<div className="movie__info__overview__element"> <span className="movie__info__overview__element--text mr-10px">scenariusz:</span> {movieCreditsCrew.map((movie, index) => (movie.job === "Screenplay" && <div className="movie__info__overview__element--next" key={index}>{movie.name}<span className="next"> &nbsp;/&nbsp; </span></div>))}</div>*/}
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-20px'>
                  produkcja:
                </span>{' '}
                {movieData.production_countries.map((movie, index) => (
                  <div
                    className='movie__info__overview__element--next'
                    key={index}
                  >
                    {movie.name}
                    <span className='next'> &nbsp;/&nbsp; </span>
                  </div>
                ))}
              </div>
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-20px'>
                  gatunki:
                </span>{' '}
                {movieData.genres.map((movie, index) => (
                  <div
                    className='movie__info__overview__element--next'
                    key={index}
                  >
                    {movie.name}
                    <span className='next'> &nbsp;/&nbsp; </span>
                  </div>
                ))}
              </div>
              <div className='movie__info__overview__element'>
                {' '}
                <span className='movie__info__overview__element--text mr-20px'>
                  premiera:
                </span>{' '}
                {`${movieData.release_date.slice(8, 10)} ${
                  months[movieData.release_date.slice(5, 7) - 1]
                } ${movieData.release_date.slice(0, 4)}`}
              </div>
            </div>
          </div>
        </div>
        <div className='movie__comments'>
          <CommentCreate />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    )
  else return <div></div>
}

export default Movie
