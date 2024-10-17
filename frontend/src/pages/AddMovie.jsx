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
            console.log(response.json());
            return response.json();
        },
    });



const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


  return (
    <div>
        <h2>Current Database : <kbd>{databaseMode}</kbd></h2>


        <form>
            <Select options={options} />
            {/* <select aria-label="Select your favorite snacks..." multiple size="6">
                <option disabled>
                    Select your favorite snacks...
                </option>
                <option>Cheese</option>
                <option selected>Fruits</option>
                <option selected>Nuts</option>
                <option>Chocolate</option>
                <option>Crackers</option>
            </select> */}
        </form>
        
        
    </div>
  )
}
