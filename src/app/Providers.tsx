"use client";

import AppContext from "@/Context";
import { useReducer } from 'react';
import { reducer } from '@/reducer/reducer';
import { initGameState } from '../constants';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState}>
      {children}
    </AppContext.Provider>
  )
}
