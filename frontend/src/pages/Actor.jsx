import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRoute } from '../../hooks/RouteContext';
import { useQuery } from '@tanstack/react-query';
import { useDatabaseMode } from '../../hooks/databaseModeContext';

export default function Actor() {

  const { setToggleDisabled } = useRoute();

  const { databaseMode } = useDatabaseMode();


  useEffect(() => {
    setToggleDisabled(true); // toggle database button is active
  }, [setToggleDisabled]);

  const { id } = useParams();


  const { data: actor, isLoading, error } = useQuery({
    queryKey: ['actor', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors/${id}`);
      return response.json();
    },
  });

  console.log(actor);



  if (isLoading) return <span aria-busy="true">Fetching data ...</span>;


  if (error) return 'An error has occurred: ' + error.message




  return (
    <div>Actor id : {id}</div>
  )
}
