import React, { useRef, useState} from 'react'
import './CommentCreate.css'
import { FaChevronRight } from 'react-icons/fa'

export default function CommentCreate () {
  const [isReply, setIsReply] = useState(false)
  const comment = useRef(null)



  return (
    <div className='commentCreate' > 
      {!isReply && (
        <div
          className='commentCreate__add'
          onClick={() => {
            setIsReply(true);
            
          }}
        >
          Dodaj komentarz...
        </div>
      )}
    {isReply && (
      <div className="commentCreate__input">
              <div
        
        className='commentCreate__input--textarea'
        contentEditable="true"
        placeholder="Napisz komentarz..."
        ref={comment}
        
        
        
      >
          
      

      </div>
      <div className='commentCreate__input__icon'>
             <FaChevronRight></FaChevronRight>
           </div>
      </div>

      )}
    </div>
  )
}
