"use client"

import Board from '@/components/Board/Board';
import Control from '@/components/Control/Control';
import ActionButtons from '@/components/Control/bits/ActionButtons';
import MovesList from '@/components/Control/bits/MovesList';
import Timers from '@/components/Timer/Timers';

export default function Home() {
  return (
    <main className='w-full flex justify-center gap-5 p-5'>
      <Timers />
      <Board />
      <Control>
        <MovesList />
        <ActionButtons />
      </Control>
    </main>
  );
}
