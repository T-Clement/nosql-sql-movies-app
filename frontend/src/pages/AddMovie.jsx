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






    const {databaseMode} = useDatabaseMode()

    console.log(databaseMode)

    const [selectedActors, setSelectedActors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDirectors, setSelectedDirectors] = useState([]);
    const [selectedStudios, setSelectedStudios] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");
    const [movieDate, setMovieDate] = useState("");
    const [movieResume, setMovieResume] = useState("");









    // // const usersQuery = useQuery({ queryKey: ['actors'], queryFn:  })

    // // const { data: actors, isLoading, error } = useQuery({
    // //     queryKey: ['actors', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
    // //     queryFn: async () => {
    // //         const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors`);
    // //         // console.log(response.json());
    // //         const responseJson = await response.json();

    // //         const formattedActors = responseJson.map(actor => ({ id: actor._id || actor.actor_id, firstname: actor.firstname, lastname: actor.lastname}));
    // //         return formattedActors;
    // //     },
    // // });
    // // console.log(actors)

    // if (isLoading) return <span aria-busy="true">Fetching data ...</span>;

    // if (error) return 'An error has occurred: ' + error.message

    // const options = actors.map(actor => ({value: actor.id, label: `${actor.firstname} ${actor.lastname}`}));




    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // console.log(e.target.values);
    //     console.log(selectedActors);
    // }




    // Requêtes parallèles pour récupérer acteurs, genres, directeurs et studios
    const results = useQueries([
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
    ]);

    // Gestion des états de chargement et des erreurs
    const isLoading = results.some(result => result.isLoading);
    const hasError = results.some(result => result.error);

    if (isLoading) return <span aria-busy="true">Fetching data ...</span>;
    if (hasError) return 'An error has occurred.';

    const [actors, genres, directors, studios] = results.map(result => result.data);

    // Fonction de gestion de la soumission du formulaire
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
        // Tu peux maintenant envoyer formData à ton backend
    };

    // Mapper les données récupérées pour les options des Select
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
                        <Select isMulti name="actors" options={options} onChange={setSelectedActors}/>
                    </label>

                    <label>
                        Genres :
                        <Select isMulti name="genres" options={options} onChange={setSelectedGenres}/>
                    </label>

                    <label>
                        Directors :
                        <Select isMulti name="directors" options={options} onChange={setSelectedDirectors}/>
                    </label>

                    <label>
                        Studios :
                        <Select isMulti name="studios" options={options} onChange={setSelectedStudios}/>
                    </label>

                    <label>
                        Movie Title :
                        <input type="text" name="title" onChange={setMovieTitle} value={movieTitle}/>
                    </label>
                    
                    <label>
                        Movie Resume :
                        <input type="text" name="description" onChange={setMovieResume} value={movieResume}/>
                    </label>

                    <label>
                        Release Date :
                        <input type="date" name="relase_date" onChange={setMovieDate} value={movieDate}/>
                    </label>

                </fieldset>


                <input type='submit' value="Register" />
            </form>

        </section>
        
        
    </div>
  )
}




// import React, { useState } from 'react';
// import { useDatabaseMode } from '../../hooks/databaseModeContext';
// import Select from 'react-select';
// import { useQueries } from '@tanstack/react-query';

// export default function AddMovie() {
//     const { databaseMode } = useDatabaseMode();

//     console.log(databaseMode);

//     // Gérer les valeurs sélectionnées pour chaque champ
//     const [selectedActors, setSelectedActors] = useState([]);
//     const [selectedGenres, setSelectedGenres] = useState([]);
//     const [selectedDirectors, setSelectedDirectors] = useState([]);
//     const [selectedStudios, setSelectedStudios] = useState([]);

//     // Requêtes parallèles pour récupérer acteurs, genres, directeurs et studios
//     const results = useQueries([
//         {
//             queryKey: ['actors', databaseMode],
//             queryFn: async () => {
//                 const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors`);
//                 const data = await response.json();
//                 return data.map(actor => ({
//                     id: actor._id || actor.actor_id,
//                     firstname: actor.firstname,
//                     lastname: actor.lastname,
//                 }));
//             },
//         },
//         {
//             queryKey: ['genres', databaseMode],
//             queryFn: async () => {
//                 const response = await fetch(`http://localhost:3000/api/${databaseMode}/genres`);
//                 const data = await response.json();
//                 return data.map(genre => ({ id: genre.id, name: genre.name }));
//             },
//         },
//         {
//             queryKey: ['directors', databaseMode],
//             queryFn: async () => {
//                 const response = await fetch(`http://localhost:3000/api/${databaseMode}/directors`);
//                 const data = await response.json();
//                 return data.map(director => ({
//                     id: director._id || director.director_id,
//                     firstname: director.firstname,
//                     lastname: director.lastname,
//                 }));
//             },
//         },
//         {
//             queryKey: ['studios', databaseMode],
//             queryFn: async () => {
//                 const response = await fetch(`http://localhost:3000/api/${databaseMode}/studios`);
//                 const data = await response.json();
//                 return data.map(studio => ({ id: studio.id, name: studio.name }));
//             },
//         },
//     ]);

//     // Gestion des états de chargement et des erreurs
//     const isLoading = results.some(result => result.isLoading);
//     const hasError = results.some(result => result.error);

//     if (isLoading) return <span aria-busy="true">Fetching data ...</span>;
//     if (hasError) return 'An error has occurred.';

//     const [actors, genres, directors, studios] = results.map(result => result.data);

//     // Fonction de gestion de la soumission du formulaire
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = {
//             title: e.target.title.value,
//             description: e.target.description.value,
//             releaseDate: e.target.relase_date.value,
//             actors: selectedActors.map(option => option.value),
//             genres: selectedGenres.map(option => option.value),
//             directors: selectedDirectors.map(option => option.value),
//             studios: selectedStudios.map(option => option.value),
//         };

//         console.log(formData);
//         // Tu peux maintenant envoyer formData à ton backend
//     };

//     // Mapper les données récupérées pour les options des Select
//     const actorOptions = actors.map(actor => ({
//         value: actor.id,
//         label: `${actor.firstname} ${actor.lastname}`,
//     }));

//     const genreOptions = genres.map(genre => ({
//         value: genre.id,
//         label: genre.name,
//     }));

//     const directorOptions = directors.map(director => ({
//         value: director.id,
//         label: `${director.firstname} ${director.lastname}`,
//     }));

//     const studioOptions = studios.map(studio => ({
//         value: studio.id,
//         label: studio.name,
//     }));

//     return (
//         <div>
//             <h2>Current Database : <kbd>{databaseMode}</kbd></h2>

//             <section>
//                 <h3>Register a New Movie</h3>

//                 <form onSubmit={handleSubmit}>
//                     <fieldset>
//                         <label>
//                             Actors :
//                             <Select
//                                 isMulti
//                                 name="actors"
//                                 options={actorOptions}
//                                 onChange={setSelectedActors}
//                             />
//                         </label>

//                         <label>
//                             Genres :
//                             <Select
//                                 isMulti
//                                 name="genres"
//                                 options={genreOptions}
//                                 onChange={setSelectedGenres}
//                             />
//                         </label>

//                         <label>
//                             Directors :
//                             <Select
//                                 isMulti
//                                 name="directors"
//                                 options={directorOptions}
//                                 onChange={setSelectedDirectors}
//                             />
//                         </label>

//                         <label>
//                             Studios :
//                             <Select
//                                 isMulti
//                                 name="studios"
//                                 options={studioOptions}
//                                 onChange={setSelectedStudios}
//                             />
//                         </label>

//                         <label>
//                             Movie Title :
//                             <input type="text" name="title" />
//                         </label>

//                         <label>
//                             Movie Resume :
//                             <input type="text" name="description" />
//                         </label>

//                         <label>
//                             Release Date :
//                             <input type="date" name="relase_date" />
//                         </label>
//                     </fieldset>

//                     <input type="submit" value="Register" />
//                 </form>
//             </section>
//         </div>
//     );
// }

