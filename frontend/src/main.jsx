import { StrictMode, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { DatabaseModeProvider } from '../hooks/databaseModeContext'


// const databaseModeContext = createContext("sql");


// const [databaseModeContext, setDatabaseModeContext] = useState 







const queryClient = new QueryClient(); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DatabaseModeProvider >
      
        <App />


        <ReactQueryDevtools initialIsOpen={false} />

      </DatabaseModeProvider>

    </QueryClientProvider>
  </StrictMode>,
)
