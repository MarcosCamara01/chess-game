"use client"

import AppContext from "@/Context";
import React, { useReducer, useEffect, useState } from 'react';
import { initGameState } from "@/constants";
import { reducer } from "@/reducer/reducer";
import { initStored } from "@/reducer/actions/game";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const [appState, dispatch] = useReducer(reducer, initGameState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Function to handle change in local storage
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "localChess" && event.newValue) {
      const newState = JSON.parse(event.newValue);
      dispatch(initStored(newState));
    }
  };

  useEffect(() => {
    // Listen for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    // Get initial state from localStorage
    const localChess = localStorage.getItem("localChess");
    if (localChess) {
      dispatch(initStored(JSON.parse(localChess)))
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }

    // Clear the event when unmounting the component
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Store state in local storage
    if (isInitialized) {
      localStorage.setItem("localChess", JSON.stringify(appState));
    }
  }, [appState, isInitialized]);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
