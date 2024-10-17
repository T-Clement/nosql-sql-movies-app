// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
// import { useDatabaseMode } from '../hooks/databaseModeContext';
// import ThemeToggle from './components/ThemeToggle';
import Header from '../components/Header';
// import Home from './pages/Home';

import { Outlet } from 'react-router-dom';



export default function DefaultLayout() {


 

  return (
    <>
        <Header />
        
        <main className="container">
            
            <Outlet />

        </main>
        
        {/* <Home /> */}
    </>
  )
}




