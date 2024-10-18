import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRoute } from '../../hooks/RouteContext';

export default function Actor() {

  const { setToggleDisabled } = useRoute();


    useEffect(() => {
      setToggleDisabled(false); // toggle database button is active
    }, [setToggleDisabled]);



    const {id} = useParams();

    // disable switch database button to avoid 404


  return (
    <div>Actor id : {id}</div>
  )
}
