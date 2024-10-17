// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import ThemeToggle from './ThemeToggle';





function Header() {

const { databaseMode, toggleDatabaseMode } = useDatabaseMode();


  return (
      <header className="container">
        <nav>
          <ul>
            <li><NavLink to='/'><strong>Netfluux</strong></NavLink></li>
            <li><ThemeToggle/></li>

            <li><button onClick={toggleDatabaseMode}>{databaseMode}</button></li>
          </ul>
          <ul>
            <li><NavLink to="/" aria-current="page">Home</NavLink></li>
            <li><NavLink to="/actors">Actors</NavLink></li>
            <li><NavLink to="/genres">Genres</NavLink></li>
          </ul>
        </nav>
      </header>
      
  )
}

export default Header




