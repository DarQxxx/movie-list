import { flexbox } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'

import { FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getCol, time } from '../firebase'

export default function Answer (params) {
  const [answer, setAnswer] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const comment = useRef(null)
  const userProps = useSelector(state => state.userData);
  const [isReply, setIsReply] = useState(false)
  const isLogged = useSelector(state => state.isLogged)
  const [comments, setComments] = useState()
  useEffect(() => {
    const updateMessages = getCol(params.movieId).doc(params.commentId.toString()).collection("answers")
      .onSnapshot(querySnapshot => {
        const items = []
        querySnapshot.forEach(doc => {
          items.push(doc.data())
        })

        
        setComments(items)
      })
    return () => {
      updateMessages()
    }
  }, [params.movieId])



  function handleChange () {
    setCommentValue(comment.current.innerText)
  }
  function handleSend () {
    if (commentValue.replace(/\s/g, '').length > 0) {
      getCol(params.movieId).doc(params.commentId.toString()).collection("answers")
      .doc(comments.length.toString())
      .set({
        comment: commentValue,
        id: comments.length,
          createdAt: time(),
          img: userProps.url,
          name: userProps.name,
          likes: 0,
          unlikes: 0
        })
        getCol(params.movieId).doc(params.commentId.toString()).get().then((doc) => {
          getCol(params.movieId).doc(params.commentId.toString()).update({
            answers: doc.data().answers + 1
          })
        })


      setCommentValue('')
      comment.current.innerText = ''
      setAnswer(false);
    }


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
        <div className='commentCreate__input__icon' onClick={handleSend}>
          <FaChevronRight></FaChevronRight>
        </div>
      </div>
    </div>}
      
    </div>
  )
}
