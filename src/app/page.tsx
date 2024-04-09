"use client"

import Board from '@/components/Board/Board';
import { reducer } from '@/reducer/reducer'
import { useReducer } from 'react'
import { initGameState } from '../constants';
import AppContext from '../Context'
import Control from '@/components/Control/Control';
import TakeBack from '@/components/Control/bits/TakeBack';
import MovesList from '@/components/Control/bits/MovesList';

export default function Home() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState} >
      <main className='flex items-center justify-center'>
        <Board />
        <Control>
          <MovesList />
          <TakeBack />
        </Control>
      </main>
    </AppContext.Provider>
  );
}
