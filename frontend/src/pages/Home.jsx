import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import { Link } from 'react-router-dom';
import AddMovieButton from '../components/AddMovieButton';
import { useRoute } from '../../hooks/RouteContext';




function Home() {


    const { setToggleDisabled } = useRoute();


    useEffect(() => {
        setToggleDisabled(false); // toggle database button is active
    }, [setToggleDisabled]);






    const { databaseMode, toggleDatabaseMode } = useDatabaseMode();

    const { data: movies, isLoading, error } = useQuery({
        queryKey: ['movies', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/${databaseMode}/movies`);
            return response.json();
        },
    });


    console.log(movies)

    if (isLoading) return 'Loading...';


    if (error) return 'An error has occurred: ' + error.message



    return (

        <>

            <h1>Movies</h1>


            <div>
                <p>{databaseMode}</p>

                <AddMovieButton />

                <div className='grid custom-grid'>
                    {movies?.map((movie) => (
                        <article key={movie._id ? movie._id : movie.movie_id}>
                            <header>
                                <hgroup>
                                    <h3>{movie.title}</h3>
                                    <p><i>{movie.year}</i></p>

                                </hgroup>
                            </header>
                            {/* <img /> */}
                            <kbd>Placer une image ici</kbd>

                            <footer>
                                {movie.genres.map(genre => <p key={movie._id ? movie._id + genre.name : movie.movie_id + genre.name}>
                                    {/* <span style={pillsStyle}><a href={`/genres/${genre.id}`}>{genre.name}</a></span> */}
                                    <kbd><Link to={`/genres/${genre.id ? genre.id : genre.name}`}>{genre.name}</Link></kbd>
                                </p>)}
                                <p><Link to={`/movies/${movie._id ? movie._id : movie.movie_id}`}>Fiche détaillée</Link></p>
                            </footer>
                        </article>
                    ))}

                </div>


            </div>

        </>
    )
}

export default Home



