import React from 'react'
import { useParams } from 'react-router-dom'

export default function Actor() {

    const {id} = useParams();

    // disable switch database button to avoid 404


  return (
    <div>Actor id : {id}</div>
  )
}
