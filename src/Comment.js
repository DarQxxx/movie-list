import React from 'react'
import './Comment.css'
import './Bootstrap.css'
import { FaRegCommentAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
export default function Comment () {
  return (
    <div className='comment'>
      <div className='comment__inside'>
        <div className='comment__inside__profile'>
          <div className='comment__inside__profileAvatar'>
            <img
              src='https://i.pinimg.com/736x/c7/a0/4a/c7a04a031ed8341798792dde36ff47e2.jpg'
              alt='User avatar'
            />
          </div>
          <div className='comment__inside__profileDateAndName'>
          <div className='comment__inside__profileName'>Diablo Diablowski</div>
          <div className='comment__inside__profileDate'>zcxzcxz</div>
          </div>
        </div>
        <div className='comment__inside__text'>Fajny film daje 2/10</div>
        <div className='comment__inside__bottom'>
          <div className='comment__inside__bottom__left'>
            <div className='comment__inside__bottom__leftAnswers'>
              {' '}
              10
              <div className='comment__inside__bottom__icons ml-5px'>
                <FaRegCommentAlt />
              </div>
            </div>
            <div className='comment__inside__bottom__leftDate ml-10px'>
              ostatnio 3 dni temu / VaginaDestroyer666
            </div>
            <div className='comment__inside__bottom__leftReactions ml-10px'>
              Y
              <div className='comment__inside__bottom__icons ml-5px mr-5px'>
                <FaRegThumbsUp />
              </div>{' '}
              X{' '}
              <div className='comment__inside__bottom__icons ml-5px'>
                <FaRegThumbsDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
