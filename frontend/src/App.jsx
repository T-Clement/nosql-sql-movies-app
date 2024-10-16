import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useDatabaseMode } from '../hooks/databaseModeContext';






function App() {

  const { databaseMode, toggleDatabaseMode } = useDatabaseMode();

  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies', databaseMode], // use databasemode as dependance of queryKey, if mode change query is refetch
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/${databaseMode}/movies`);
      return response.json();
    },
  });

  if (isLoading) return 'Loading...';




  if (error) return 'An error has occurred: ' + error.message

 

  return (
    <>
      <header className="container">
        <nav>
          <ul>
            <li><strong>Netfluux</strong></li>
            <li><button onClick={toggleDatabaseMode}>{databaseMode}</button></li>
          </ul>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Actors</a></li>
            <li><a href="#">Genres</a></li>
          </ul>
        </nav>
      </header>



      <main className="container">



        <h1>Movies</h1>


        <div>
          <p>{databaseMode}</p>
          <ul>
            {movies?.map((movie) => <li key={movie._id ? movie._id : movie.movie_id}>{movie.title}</li>)}
          </ul>

          {/* <div>
//       <h1>{data.full_name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//       <div>{isFetching ? 'Updating...' : ''}</div>
//     </div> */}

        </div>



      </main>
    </>
  )
}

export default App




// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// const queryClient = new QueryClient()

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools />
//       <Example />
//     </QueryClientProvider>
//   )
// }

// // function Example() {
// const { isPending, error, data, isFetching } = useQuery({
//   queryKey: ['repoData'],
//   queryFn: async () => {
//     const response = await fetch(
//       'https://api.github.com/repos/TanStack/query',
//     )
//     return await response.json()
//   },
// })

// if (isPending) return 'Loading...'

// if (error) return 'An error has occurred: ' + error.message

//   return (
//     <div>
//       <h1>{data.full_name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//       <div>{isFetching ? 'Updating...' : ''}</div>
//     </div>
//   )
// }

// const rootElement = document.getElementById('root') as HTMLElement
// ReactDOM.createRoot(rootElement).render(<App />)
