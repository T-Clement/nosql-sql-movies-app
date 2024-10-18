import React, { useEffect, useState } from 'react'
import { useDatabaseMode } from '../../hooks/databaseModeContext'
import Select from 'react-select'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useRoute } from '../../hooks/RouteContext';

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
                    return data.map(genre => ({ id: genre.id, name: genre.name }));
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
                    return data.map(studio => ({ id: studio.id, name: studio.name }));
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
            title: e.target.title.value,
            description: e.target.description.value,
            releaseDate: e.target.relase_date.value,
            actors: selectedActors.map(option => option.value),
            genres: selectedGenres.map(option => option.value),
            directors: selectedDirectors.map(option => option.value),
            studios: selectedStudios.map(option => option.value),
        };

        console.log(formData);
        // send formData to backend
    };

    // format objects to use it in select
    const actorOptions = actors.map(actor => ({
        value: actor.id,
        label: `${actor.firstname} ${actor.lastname}`,
    }));

    const genreOptions = genres.map(genre => ({
        value: genre.id,
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

                <form onSubmit={handleSubmit}>
                    <fieldset>

                        <label>
                            Actors :
                            <Select isMulti name="actors" options={actorOptions} onChange={setSelectedActors} />
                        </label>

                        <label>
                            Genres :
                            <Select isMulti name="genres" options={genreOptions} onChange={setSelectedGenres} />
                        </label>

                        <label>
                            Directors :
                            <Select isMulti name="directors" options={directorOptions} onChange={setSelectedDirectors} />
                        </label>

                        <label>
                            Studios :
                            <Select isMulti name="studios" options={studioOptions} onChange={setSelectedStudios} />
                        </label>

                        <label>
                            Movie Title :
                            <input type="text" name="title" onChange={(e) => setMovieTitle(e.target.value)} value={movieTitle} />
                        </label>

                        <label>
                            Movie Resume :
                            <input type="text" name="description" onChange={(e) => setMovieResume(e.target.value)} value={movieResume} />
                        </label>

                        <label>
                            Release Date :
                            <input type="date" name="relase_date" onChange={(e) => setMovieDate(e.target.value)} value={movieDate} />
                        </label>

                    </fieldset>


                    <input type='submit' value="Register" />
                </form>

            </section>


        </div>
    )
}


