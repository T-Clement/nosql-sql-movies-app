import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import { useParams } from 'react-router-dom';
import { useRoute } from '../../hooks/RouteContext';

export default function Movie() {

    const { setToggleDisabled } = useRoute();


    useEffect(() => {
        setToggleDisabled(true); // toggle database button is not active
    }, [setToggleDisabled]);


    const { databaseMode } = useDatabaseMode();

    console.log(databaseMode);
    const { id } = useParams();



    // disable switch database button to avoid 404



    const { data: movie, isLoading, error } = useQuery({
        queryKey: ['movie', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/${databaseMode}/movies/${id}`);
            return response.json();
        },
    });


    console.log(movie);


    if (isLoading) return <span aria-busy="true">Fetching data ...</span>;


    if (error) return 'An error has occurred: ' + error.message


    return (
        <div>
            <article key={movie._id ? movie._id : movie.movie_id}>
                <header>
                    <hgroup>
                        <h3>{movie.title}</h3>
                        <p><i>{movie.year}</i></p>

                    </hgroup>
                </header>
                {/* <img /> */}
                <kbd>Placer une image ici</kbd>
                <p>{movie.description}</p>
                <footer>
                    <div>
                        <p>Actors :</p>
                        {movie.actors.map(actor => <p key={actor._id ? actor._id : actor.actor_id }>
                            <kbd><a href={`/actors/${actor._id ? actor._id : actor.actor_id }`}>{actor.firstname} {actor.lastname}</a></kbd>
                        </p>)}
                    </div>
                    <div>
                        <p>Genres :</p>
                        {movie.genres.map(genre => <p key={movie._id ? movie._id + genre.name : movie.movie_id + genre.name}>
                            {/* <span style={pillsStyle}><a href={`/genres/${genre.id}`}>{genre.name}</a></span> */}
                            <kbd><a href={`/genres/${genre.id ? genre.id : genre.name}`}>{genre.name}</a></kbd>
                        </p>)}
                    </div>
                </footer>
            </article>
        </div>
    )
}
