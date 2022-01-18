import React, { useEffect, useState } from 'react'
import './Comment.css'
import './Bootstrap.css'
import { FaRegCommentAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import { getAnything } from './firebase'
export default function Comment ({params}) {
  const [comments, setComments] = useState([])
  console.log(params.movieId)

  useEffect(() => {
    //setIsLoading({ loading1: true, loading2: true })

      //Ściąganie wiadomości z użytkownikiem
    const updateMessages = getAnything(params.movieId)
      .orderBy('createdAt')
      .onSnapshot(querySnapshot => {
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
    <div className='comment'>
      <div className='comment__inside'>
        <div className='comment__inside__profile'>
          <div className='comment__inside__profileAvatar'>
            <img
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT593SIoiWBEUW1HgK4FNfdz4fs9WkhwOr-eg&usqp=CAU`}
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
