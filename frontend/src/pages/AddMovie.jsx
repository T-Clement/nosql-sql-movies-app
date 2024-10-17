import React from 'react'
import { useDatabaseMode } from '../../hooks/databaseModeContext'
import Select from 'react-select'
import { useQuery } from '@tanstack/react-query'

export default function AddMovie() {

    const {databaseMode} = useDatabaseMode()

    console.log(databaseMode)



    // const usersQuery = useQuery({ queryKey: ['actors'], queryFn:  })

    const { data: actors, isLoading, error } = useQuery({
        queryKey: ['actors', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/${databaseMode}/actors`);
            // console.log(response.json());
            const responseJson = await response.json();

            const formattedActors = responseJson.map(actor => ({ id: actor._id || actor.actor_id, firstname: actor.firstname, lastname: actor.lastname}));
            return formattedActors;
        },
    });
    console.log(actors)

    if (isLoading) return <span aria-busy="true">Fetching data ...</span>;

    if (error) return 'An error has occurred: ' + error.message

    const options = actors.map(actor => ({value: actor.id, label: `${actor.firstname} ${actor.lastname}`}));




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.values);
    }


  return (
    <div>
        <h2>Current Database : <kbd>{databaseMode}</kbd></h2>

        <section>

            <h3>Register a New Movie</h3>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    
                    <label>
                        Actors :
                        <Select isMulti name="actors" options={options} />
                    </label>

                    <label>
                        Genres :
                        <Select isMulti name="actors" options={options} />
                    </label>

                    <label>
                        Directors :
                        <Select isMulti name="actors" options={options} />
                    </label>

                    <label>
                        Studios :
                        <Select isMulti name="actors" options={options} />
                    </label>

                    <label>
                        Movie Title :
                        <input type="text"  required/>
                    </label>
                    
                    <label>
                        Movie Resume :
                        <input type="text" />
                    </label>

                    <label>
                        Release Date :
                        <input type="date"  required/>
                    </label>

                </fieldset>


                <input type='submit' value="Register" />
            </form>

        </section>
        
        
    </div>
  )
}
