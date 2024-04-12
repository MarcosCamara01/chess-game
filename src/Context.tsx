import React, { createContext, useContext } from 'react';
import { Action, GameState } from './types/types';
import { initGameState } from './constants';

interface AppContextType {
  appState: GameState;
  dispatch: React.Dispatch<Action>;
}

const initialState = {
  appState: initGameState,
  dispatch: () => null
}

const AppContext = createContext<AppContextType>(initialState);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext.Provider');
  }
  return context;
}

export default AppContext;