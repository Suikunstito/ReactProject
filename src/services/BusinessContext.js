import React, { createContext, useState, useContext } from 'react';

const BusinessContext = createContext();

export const useBusinesses = () => useContext(BusinessContext);

export const BusinessProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState([]);

  return (
    <BusinessContext.Provider value={{ businesses, setBusinesses }}>
      {children} {}
    </BusinessContext.Provider>
  );
};
