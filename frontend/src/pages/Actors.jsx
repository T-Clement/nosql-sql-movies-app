import React, { useEffect } from 'react'
import { useRoute } from '../../hooks/RouteContext';

export default function Actors() {

  const { setToggleDisabled } = useRoute();


  useEffect(() => {
    setToggleDisabled(false); // toggle database button is active
  }, [setToggleDisabled]);


  return (
    <div>Actors</div>
  )
}
