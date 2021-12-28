import React from 'react'
import { useParams } from 'react-router-dom'

function Movie() {
    const params= useParams()
    console.log(params.movieId)
    return (
        <div>
            
        </div>
    )
}

export default Movie
