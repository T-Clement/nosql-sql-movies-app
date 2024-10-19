import React, { useEffect, useState } from 'react'
import { useDatabaseMode } from '../../hooks/databaseModeContext'
import Select from 'react-select'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { useRoute } from '../../hooks/RouteContext';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function AddMovie() {

    const { setToggleDisabled } = useRoute();


    useEffect(() => {
        setToggleDisabled(false); // toggle database button is active
    }, [setToggleDisabled]);



    const { databaseMode } = useDatabaseMode()

    console.log(databaseMode)

    const [selectedActors, setSelectedActors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDirectors, setSelectedDirectors] = useState([]);
    const [selectedStudios, setSelectedStudios] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");
    const [movieDate, setMovieDate] = useState("");
    const [movieResume, setMovieResume] = useState("");


    // reset form fields when database mode change
    useEffect(() => {
        resetFormFields();
    }, [databaseMode]);


    const resetFormFields = () => {
        setSelectedActors([]);
        setSelectedGenres([]);
        setSelectedDirectors([]);
        setSelectedStudios([]);
        setMovieTitle('');
        setMovieDate('');
        setMovieResume('');
    };



    // ADD A MOVIE 
    const addMovie = async (newMovie) => {
        const response = await axios.post(`http://localhost:3000/api/${databaseMode}/movies/store`, newMovie);
        return response.data;
    }


    const mutation = useMutation({
        mutationFn: addMovie,
        onSuccess: (data) => {
            console.log("Movie added successfully: ", data);
            resetFormFields();
        },
        onError: (error) => {
            console.error('Error adding movie :', error);
        }
    });

    const { mutate, isLoading: isSubmitting, isError, isSuccess } = mutation;


    // parallels request to fetch actors, genres, directors and studios data
    const results = useQueries({
        queries: [

            {
                queryKey: ['actors', databaseMode],
                queryFn: async () => {
                    const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors`);
                    const data = await response.json();
                    return data.map(actor => ({
                        id: actor._id || actor.actor_id,
                        firstname: actor.firstname,
                        lastname: actor.lastname,
                    }));
                },
            },
            {
                queryKey: ['genres', databaseMode],
                queryFn: async () => {
                    const response = await fetch(`http://localhost:3000/api/${databaseMode}/genres`);
                    const data = await response.json();
                    return data.map(genre => ({ id: databaseMode === 'sql' ? genre.genre_id : genre, name: databaseMode === 'sql' ?  genre.name : genre }));
                },
            },
            {
                queryKey: ['directors', databaseMode],
                queryFn: async () => {
                    const response = await fetch(`http://localhost:3000/api/${databaseMode}/directors`);
                    const data = await response.json();
                    return data.map(director => ({
                        id: director._id || director.director_id,
                        firstname: director.firstname,
                        lastname: director.lastname,
                    }));
                },
            },
            {
                queryKey: ['studios', databaseMode],
                queryFn: async () => {
                    const response = await fetch(`http://localhost:3000/api/${databaseMode}/studios`);
                    const data = await response.json();
                    return data.map(studio => ({ id: studio._id || studio.studio_id, name: studio.name }));
                },
            },
        ]
    });


    // console.warn('results :', results);

    // handle states and errors
    const isLoading = results.some(result => result.isLoading);
    const hasError = results.some(result => result.error);

    if (isLoading) return <span aria-busy="true">Fetching data ...</span>;
    if (hasError) return 'An error has occurred.';

    const [actors = [], genres = [], directors = [], studios = []] = results.map(result => result.data || []);




    // functions
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title: movieTitle,
            description: movieResume,
            releaseDate: movieDate,
            actors: selectedActors.map(option => option.value),
            genres: selectedGenres.map(option => option.value),
            directors: selectedDirectors.map(option => option.value),
            studios: selectedStudios.map(option => option.value),
        };

        console.log('Submitted formData :', formData);
        // send formData to backend

        // 
        mutation.mutate(formData);
    };

    // format objects to use it in select
    const actorOptions = actors.map(actor => ({
        value: actor.id,
        label: `${actor.firstname} ${actor.lastname}`,
    }));

    const genreOptions = genres.map(genre => ({
        value: genre.id ? genre.id : genre,
        label: genre.name,
    }));

    const directorOptions = directors.map(director => ({
        value: director.id,
        label: `${director.firstname} ${director.lastname}`,
    }));

    const studioOptions = studios.map(studio => ({
        value: studio.id,
        label: studio.name,
    }));

    return (
        <div>
            <h2>Current Database : <kbd>{databaseMode}</kbd></h2>

            <section>

                <h3>Register a New Movie</h3>
                {isSuccess && <div><p>Film successfully added !</p><p><Link to={`/movies/${mutation.data.movie._id || mutation.data.movie.movie_id}`}>Go to new movie</Link></p></div>}
                <form onSubmit={handleSubmit}>
                    <fieldset>

                        <label>
                            Actors :
                            <Select isMulti name="actors" options={actorOptions} onChange={setSelectedActors} value={selectedActors}/>
                        </label>

                        <label>
                            Genres :
                            <Select isMulti name="genres" options={genreOptions} onChange={setSelectedGenres} value={selectedGenres}/>
                        </label>

                        <label>
                            Directors :
                            <Select isMulti name="directors" options={directorOptions} onChange={setSelectedDirectors} value={selectedDirectors}/>
                        </label>

                        <label>
                            Studios :
                            <Select isMulti name="studios" options={studioOptions} onChange={setSelectedStudios} value={selectedStudios}/>
                        </label>

                        <label>
                            Movie Title :
                            <input type="text" name="title" onChange={(e) => setMovieTitle(e.target.value)} value={movieTitle} />
                        </label>

                        <label>
                            Movie Resume :
                            <textarea rows={10} name="description" onChange={(e) => setMovieResume(e.target.value)} value={movieResume} />
                        </label>

                        <label>
                            Release Date :
                            <input type="date" name="relase_date" onChange={(e) => setMovieDate(e.target.value)} value={movieDate} />
                        </label>

                    </fieldset>


                    <input type='submit' value="Register" />
                </form>

                {isSubmitting && <p>Sending in progress...</p>}
                
                {isError && <p>An error happened during film adding process.</p>}


            </section>


        </div>
    )
}


