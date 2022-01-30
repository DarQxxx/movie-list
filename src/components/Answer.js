import { flexbox } from '@mui/system'
import React, { useRef, useState } from 'react'

import { FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Answer () {
  const [answer, setAnswer] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const comment = useRef(null)
  const userProps = useSelector(state => state.userData);

  function handleChange () {
    setCommentValue(comment.current.innerText)
  }

  return (
    <div>
      <div
        className='comment__answer'
        onClick={() => {
          setAnswer(!answer)
        }}
      >
        Odpowiedz
      </div>
      {answer && <div>
      
        
      <div className='commentCreate__input commentCreate__input--position'>
      <img className="comment__answerImg" src={userProps.url}></img>
        <div
          className=' comment__answer__input--textarea'
          contentEditable='true'
          placeholder='Napisz komentarz...'
          ref={comment}
          onInput={handleChange}
        ></div>
        <div className='commentCreate__input__icon'>
          <FaChevronRight></FaChevronRight>
        </div>
      </div>
    </div>}
      
    </div>
  )
}
