import React, { useEffect, useState } from 'react';
import "./Comment.css"
import Answer from './components/Answer';
import { getCol } from './firebase';
import {  FaRegThumbsUp, FaRegThumbsDown, FaRegCommentAlt } from 'react-icons/fa';

export default function AnsweredComment(params) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        //setIsLoading({ loading1: true, loading2: true })

        const updateMessages = getCol(params.movieId).doc(params.commentId.toString()).collection("answers").onSnapshot(querySnapshot => {
     // .orderBy('createdAt')

        const items = []
        querySnapshot.forEach(doc => {
          items.push(doc.data())
        })

        
        setComments(items)
        //setIsLoading({ loading1: false, loading2: isLoading.loading2 })
      })
      // Wyłączenie nasłuchiwania wiadomości z konkretnym użytkownikiem
    return () => {
      updateMessages()
    }
  }, [params.movieId])
  console.log(comments)
  return (
    <div>
     {comments.map ((comment, index) => (
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
              <Answer/>
            </div>
            </div>
          </div>
          
        </div>
        
        
          </div>}
          
      </div>
      ))}
    </div>
  )

}
