import { createContext, useContext, useState } from 'react';

// Créer un contexte
const DatabaseModeContext = createContext();

export const DatabaseModeProvider = ({ children }) => {
  const [databaseMode, setDatabaseMode] = useState('sql');

  const toggleDatabaseMode = () => {
    setDatabaseMode((prevMode) => (prevMode === 'sql' ? 'mongodb' : 'sql'));
  };

  return (
    <DatabaseModeContext.Provider value={{ databaseMode, toggleDatabaseMode }}>
      {children}
    </DatabaseModeContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useDatabaseMode = () => {
  return useContext(DatabaseModeContext);
};
