import React, { useRef, useState } from 'react'
import "./CommentCreate.css"
import { FaLocationArrow } from 'react-icons/fa'

export default function CommentCreate() {
    const [isReply, setIsReply] = useState(false)
    const comment = useRef(null);
    return (
        <div className="commentCreate">
            {!isReply &&  (<div className="commentCreate__add" onClick={() => {setIsReply(true)}}>Dodaj komentarz</div>)  }
            <div contentEditable="true" className="commentCreate__input" ref={comment} onChange={() => {console.log("change")}}>asdss
            </div>
        </div>
    )
}
