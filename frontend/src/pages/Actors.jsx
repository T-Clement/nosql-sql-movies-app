import React, { useEffect } from 'react'
import { useRoute } from '../../hooks/RouteContext';
import { useQuery } from '@tanstack/react-query';
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import { Link } from 'react-router-dom';

export default function Actors() {

  const { setToggleDisabled } = useRoute();

  const { databaseMode } = useDatabaseMode();


  useEffect(() => {
    setToggleDisabled(false); // toggle database button is active
  }, [setToggleDisabled]);



  const { data: actors, isLoading, error } = useQuery({
    queryKey: ['actors', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors`);
      return response.json();
    },
  });


  console.log(actors);


  if (isLoading) return <span aria-busy="true">Fetching data ...</span>;


  if (error) return 'An error has occurred: ' + error.message




  return (
    <div>
      <h1>Actors</h1>


      <div>
        <p>{databaseMode}</p>


        <div className='grid custom-grid'>
          {actors?.map((actor) => (
            <article key={actor._id ? actor._id : actor.actor_id}>
              <header>
                <hgroup>
                  <h3>{actor.firstname} {actor.lastname}</h3>
                </hgroup>
              </header>
              {/* <img /> */}
              <kbd>Placer une image ici</kbd>

              <footer>
                
                <p><Link to={`/actors/${actor._id ? actor._id : actor.actor_id}`}>Fiche détaillée de l'acteur</Link></p>
              </footer>
            </article>
          ))}

        </div>


      </div>
    </div>
  )
}
