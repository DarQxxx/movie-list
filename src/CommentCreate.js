import React, { useRef, useState } from 'react'
import './CommentCreate.css'
import { FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getCol, time } from './firebase'

export default function CommentCreate (params) {
  const [isReply, setIsReply] = useState(false)
  const comment = useRef(null)
  const isLogged = useSelector(state => state.isLogged)
  const [commentValue, setCommentValue] = useState('')
  const userProps = useSelector(state => state.userData)

  function handleChange () {
    setCommentValue(comment.current.innerText)
  }
  function handleSend () {
    if (commentValue.replace(/\s/g, '').length > 0) {
      getCol(params.params.movieId)
        .doc(params.comments.length.toString())
        .set({
          comment: commentValue,
          id: params.comments.length,
          createdAt: time(),
          img: userProps.url,
          name: userProps.name,
          likes: 0,
          unlikes: 0,
          answers: 0
        })

      setCommentValue('')
      comment.current.innerText = ''
    }
  }

  return (
    <div className='commentCreate'>
      {!isReply ? (
        <div className='commentCreate__add'>
          {isLogged ? (
            <div
              onClick={() => {
                setIsReply(true)
              }}
              className='commentCreate__addComment'
            >
              Dodaj nowy komentarz...
            </div>
          ) : (
            <div>
              <span className='commentCreate__login'>Zaloguj się</span>, żeby
              dodać komentarz
            </div>
          )}
        </div>
      ):
      (
        <div className='commentCreate__add'>
          {isLogged ? (
                    <div className='commentCreate__input'>
                    <div
                      className='commentCreate__input--textarea'
                      contentEditable='true'
                      placeholder='Napisz komentarz...'
                      ref={comment}
                      onInput={handleChange}
                    ></div>
                    <div className='commentCreate__input__icon' onClick={handleSend}>
                      <FaChevronRight></FaChevronRight>
                    </div>
                  </div>
          ) : (
            <div>
              <span className='commentCreate__login'>Zaloguj się</span>, żeby
              dodać komentarz
            </div>
          )}
        </div>
      )
      }

    </div>
  )
}
