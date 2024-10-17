import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import { useParams } from 'react-router-dom';

export default function Movie() {

    const {databaseMode} = useDatabaseMode();

    const {id} = useParams();


    const { data: movie, isLoading, error } = useQuery({
        queryKey: ['movie', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/${databaseMode}/movies/${id}`);
            return response.json();
        },
    });


    console.log(movie);


    return (
        <div>Movie</div>
    )
}
