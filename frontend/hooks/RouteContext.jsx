import { createContext, useContext, useState } from 'react';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [isToggleDisabled, setToggleDisabled] = useState(false);

  return (
    <RouteContext.Provider value={{ isToggleDisabled, setToggleDisabled }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
