import React, { createContext, useContext, useState } from "react";

// Create the context
const LoadingPage = createContext();

// Create a provider component
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingPage.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingPage.Provider>
  );
};

// Create a custom hook for easy access
export const useLoading = () => useContext(LoadingPage);
