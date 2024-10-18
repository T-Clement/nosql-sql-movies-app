// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useDatabaseMode } from '../../hooks/databaseModeContext';
import ThemeToggle from './ThemeToggle';
import { useRoute } from '../../hooks/RouteContext';





function Header() {

const { databaseMode, toggleDatabaseMode } = useDatabaseMode();

const location = useLocation();

// console.log(location.pathname);


const {isToggleDisabled} = useRoute();

  return (
      <header className="container">
        <nav>
          <ul>
            <li><NavLink to='/'><strong>Netfluux</strong></NavLink></li>
            <li><ThemeToggle/></li>

            <li><button onClick={toggleDatabaseMode} disabled={isToggleDisabled}>{databaseMode}</button></li>
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




