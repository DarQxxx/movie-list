import React from 'react'
import './Comment.css'
import './Bootstrap.css'
import { FaRegCommentAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'

export default function Comment (params) {


  return (
    <div className='comment'>
      {params.comments.map ((comment, index) => (
      <div className='comment__inside' key={index}>
        <div className='comment__inside__profile'>
          <div className='comment__inside__profileAvatar'>
            <img
              src={comment.img}
              alt='User avatar'
            />
          </div>
          <div className='comment__inside__profileDateAndName'>
          <div className='comment__inside__profileName'>{comment.name}</div>
          <div className='comment__inside__profileDate'>{comment.date}</div>
          </div>
        </div>
        <div className='comment__inside__text'>{comment.comment}</div>
        <div className='comment__inside__bottom'>
          <div className='comment__inside__bottom__left'>
            <div className='comment__inside__bottom__leftAnswers'>
              {' '}
              10
              <div className='comment__inside__bottom__icons ml-5px'>
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
              Odpowiedz
            </div>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}
