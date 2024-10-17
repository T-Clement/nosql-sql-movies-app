// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import ThemeToggle from './ThemeToggle';





function Header() {

const { databaseMode, toggleDatabaseMode } = useDatabaseMode();


  return (
      <header className="container">
        <nav>
          <ul>
            <li><strong>Netfluux</strong></li>
            <li><ThemeToggle/></li>

            <li><button onClick={toggleDatabaseMode}>{databaseMode}</button></li>
          </ul>
          <ul>
            <li><a href="/" aria-current="page">Home</a></li>
            <li><a href="/actors">Actors</a></li>
            <li><a href="/genres">Genres</a></li>
          </ul>
        </nav>
      </header>
      
  )
}

export default Header




