import React, { useEffect, useState } from 'react'
import { useRoute } from '../../hooks/RouteContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Mutation, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import axios from 'axios';

export default function EditActor() {

    // states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState("");


    const { setToggleDisabled } = useRoute();


    useEffect(() => {
        setToggleDisabled(true); // toggle database button is active
    }, [setToggleDisabled]);


    const { databaseMode } = useDatabaseMode();
    const { id } = useParams();
    const navigate = useNavigate();

    // const queryClient = useQueryClient();

    const { data: actor, isLoading, error } = useQuery({
        queryKey: ['actor', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors/${id}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return response.json();
        },
        onError: (error) => {
            if (error.message.includes('404')) {
                navigate('/404');
            }
        }
    });

    // console.log(actor);

    useEffect(() => {
        if (actor) {
            setFirstName(actor.firstname || '');
            setLastName(actor.lastname || '');
            setBio(actor.bio ? actor.bio : actor.biographie || '');
        }
    }, [actor]);


    const updateMutation = useMutation({
        mutationFn: async (updatedActor) => {
            const response = await axios.put(`http://localhost:3000/api/${databaseMode}/actors/${id}/update`, updatedActor);
            return response.data;
        },
        onSuccess: () => {
            // queryClient.invalidateQueries('actor'); // invalidate query to use fresh data
            navigate(`/actors/${id}`);
        }

    });


    const deleteMutation = useMutation({
        mutationFn: async (deletedActorId) => {
            const response = await axios.delete(`http://localhost:3000/api/${databaseMode}/actors/${id}/delete`, deletedActorId);
            return response.data;
        },
        onSuccess: () => {
            navigate(`/actors`);
        }
    })



    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedActor = {
            id: id,
            firstname: firstName,
            lastname: lastName,
            biographie: bio
        };

        console.log('updated actor', updatedActor);
        // return;
        updateMutation.mutate(updatedActor);

    }



    const handleDelete = (e) => {
        e.preventDefault();
        const deletedActorId = id;

        if (window.confirm('Are you sure you want to delete this actor? This action cannot be undone.')) {
            deleteMutation.mutate(deletedActorId);
        }
        return;
    }



    if (isLoading) return <span aria-busy="true">Fetching data ...</span>;


    if (error) return 'An error has occurred: ' + error.message





    return (
        <div>
            <h1>EditActor</h1>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        Firsname :
                        <input type='text' name='firstname' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </label>

                    <label>
                        Lastname :
                        <input type='text' name='lastname' onChange={(e) => setLastName(e.target.value)} value={lastName} />

                    </label>

                    <label>
                        Bio :
                        <textarea rows={7} name='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                    </label>

                </fieldset>

                <fieldset>
                    <label>
                        Movies :
                        <ul>
                            {actor.movies.map(movie =>
                                (<li key={movie.movie_id || movie._id}><Link to={`/movies/${movie.movie_id || movie._id}`}>{movie.title} - {movie.year}</Link></li>)
                            )}
                        </ul>
                    </label>
                </fieldset>

                <button className="secondary" type='submit' disabled={updateMutation.isLoading}>
                    {updateMutation.isLoading ? <span aria-busy="true">Updating...</span> : 'Update'}
                </button>

                {updateMutation.isError && (
                    <div>An error occurred: {updateMutation.error.message}</div>
                )}


                <button style={{ backgroundColor: "#AF291D" }} type="button" onClick={handleDelete} disabled={deleteMutation.isLoading}>
                    {deleteMutation.isLoading ? <span aria-busy="true">Deleting...</span> : 'Delete Actor'}
                </button>




            </form>
        </div>
    )
}
