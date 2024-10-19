import React from 'react'
import { Link } from 'react-router-dom'

export default function AddMovieButton() {
  return (
    <div>
        <button className=''><Link className='contrast' to="/movies/new">Add a Movie</Link></button>
    </div>
  )
}
