import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useRoute } from '../../hooks/RouteContext';
import { useQuery } from '@tanstack/react-query';
import { useDatabaseMode } from '../../hooks/databaseModeContext';

export default function Actor() {

  const { setToggleDisabled } = useRoute();

  const { databaseMode } = useDatabaseMode();

  const navigate = useNavigate();

  useEffect(() => {
    setToggleDisabled(true); // toggle database button is active
  }, [setToggleDisabled]);

  const { id } = useParams();


  const { data: actor, isLoading, error } = useQuery({
    queryKey: ['actor', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors/${id}`);
      // console.log(response);
      if(!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    },
    onError: (error) => {
      if(error.message.includes("404")) {
        navigate('/404');
      }
        
    }
  });

  console.log(actor);



  if (isLoading) return <span aria-busy="true">Fetching data ...</span>;


  if (error) return 'An error has occurred: ' + error.message




  return (
    <div>
      Actor id : {id}

      <article key={actor._id ? actor._id : actor.actor_id}>
        <header>
          <hgroup>
            <h3>{actor.firstname} {actor.lastname}</h3>
            <i>{actor.bio || actor.biographie}</i>
          </hgroup>
        </header>
        {/* <img /> */}
        <kbd>Placer une image ici</kbd>
        <footer>
          <p>Films :</p>
          <ul>
            <li>TODO with <Link>link to movie</Link></li>
          </ul>
        </footer>
      </article>

      <button className='secondary'>
        <NavLink className='contrast' to={`/actors/${id}/edit`} >
        Edit
        </NavLink>
      </button>

    </div>


  )
}
