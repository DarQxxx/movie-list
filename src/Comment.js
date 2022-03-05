import React, { useEffect, useState } from 'react'
import './Comment.css'
import './Bootstrap.css'
import {  FaRegThumbsUp, FaRegThumbsDown, FaRegCommentAlt } from 'react-icons/fa'
import Answer from './components/Answer'
import AnsweredComment from './AnsweredComment'

export default function Comment (params) {
  const [isShown, setIsShown] = useState(false)
  
  return (
    <div className='comment'>
      {params.comments.map ((comment, index) => (
      <div  key={index}>
        {comment.createdAt !== null && <div className='comment__inside'>
          <div className='comment__inside__profile'>
          <div className='comment__inside__profileAvatar'>
            <img
              src={comment.img}
              alt='User avatar'
            />
          </div>
          
          <div className='comment__inside__profileDateAndName'>
          <div className='comment__inside__profileName'>{comment.name}</div>
          <div className='comment__inside__profileDate'>{ `${String(comment.createdAt.toDate().getDate()).padStart(2, '0')}.${String(comment.createdAt.toDate().getMonth() + 1).padStart(2, '0')}.${comment.createdAt.toDate().getFullYear()} o ${comment.createdAt.toDate().getHours()}:${comment.createdAt.toDate().getMinutes()}`}</div>
          </div>
        </div>
        <div className='comment__inside__text'>{comment.comment}</div>
        <div className='comment__inside__bottom'>
          <div className='comment__inside__bottom__left'>
            <div className='comment__inside__bottom__leftAnswers'>
              {' '}
              {comment.answers}
              <div className='comment__inside__bottom__icons ml-5px pointer' onClick={()=>{setIsShown(!isShown)}}>
              <FaRegCommentAlt />
                
              </div>
            </div>

            <div className='comment__inside__bottom__leftReactions ml-10px'>
              {comment.likes}
              <div className='comment__inside__bottom__icons ml-5px mr-5px'>
                <FaRegThumbsUp />
              </div>
              {comment.unlikes}
              <div className='comment__inside__bottom__icons ml-5px'>
                <FaRegThumbsDown />
              </div>
              <div className='comment__inside__bottom__leftDate ml-10px'>
              <Answer commentId={comment.id} movieId={params.params.movieId}/>
            </div>
            </div>
          </div>
          
        </div>
        {isShown && <AnsweredComment commentId={comment.id} movieId={params.params.movieId}/>}
        
          </div>}
          
      </div>
      ))}
    
    </div>
  )
}
