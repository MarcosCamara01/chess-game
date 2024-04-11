"use client"

import Board from '@/components/Board/Board';
import Control from '@/components/Control/Control';
import ActionButtons from '@/components/Control/bits/ActionButtons';
import MovesList from '@/components/Control/bits/MovesList';

export default function Home() {
  return (
    <main className='w-full flex justify-center gap-5 p-5'>
      <Board />
      <Control>
        <MovesList />
        <ActionButtons />
      </Control>
    </main>
  );
}
