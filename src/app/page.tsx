"use client"

import { useReducer } from 'react';
import { reducer } from '@/reducer/reducer';
import { initGameState } from '../constants';
import AppContext from '../Context';
import Board from '@/components/Board/Board';
import Control from '@/components/Control/Control';
import ActionButtons from '@/components/Control/bits/ActionButtons';
import MovesList from '@/components/Control/bits/MovesList';

export default function Home() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState} >
      <main className='w-full flex justify-center gap-5 p-5'>
        <Board />
        <Control>
          <MovesList />
          <ActionButtons />
        </Control>
      </main>
    </AppContext.Provider>
  );
}
