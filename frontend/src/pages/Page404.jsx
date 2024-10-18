import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div>
        <p>404, you're lost</p>
        <p><Link to={'/'}>Go back to home</Link></p>
    </div>
  )
}
