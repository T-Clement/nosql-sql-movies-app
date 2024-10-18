import React, { useEffect, useState } from 'react'
import { useRoute } from '../../hooks/RouteContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
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
    const { navigate } = useNavigate();

    const { data: actor, isLoading, error } = useQuery({
        queryKey: ['actor', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors/${id}`);
          
            if(!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return response.json();
        },
        onError: (error) => {
            if(error.message.includes('404')) {
                navigate('/404');
            }
        }
    });

    console.log(actor);

    useEffect(() => {
        if (actor) {
            setFirstName(actor.firstname || '');
            setLastName(actor.lastname || '');
            setBio(actor.bio ? actor.bio : actor.biographie || '');
        }
    }, [actor]);


    const mutation = useMutation({
        mutationFn: async (updatedActor) => {
            const response = await axios.put(`http://localhost:3000/api/${databaseMode}/actors/${id}/update`, updatedActor);
            return response.data;
        },
        onSuccess: () => {
            navigate(`/actors/${id}`);
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
        mutation.mutate(updatedActor);

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
                            <li>TODO -- played movies</li>
                        </ul>
                    </label>
                </fieldset>

                <button type='submit' disabled={mutation.isLoading}>
                    {mutation.isLoading ? <span aria-busy="true">Updating...</span> : 'Update'}
                </button>

                {mutation.isError && (
                    <div>An error occurred: {mutation.error.message}</div>
                )}


            </form>
        </div>
    )
}
