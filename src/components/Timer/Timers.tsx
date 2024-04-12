import React, { useEffect } from 'react';
import { useAppContext } from '@/Context';
import { updateBlackTimer, updateWhiteTimer } from '@/reducer/actions/game';
import Image from 'next/image';
import bK from "../../../public/pieces/bK.png"
import wK from "../../../public/pieces/wK.png"

const Timers: React.FC = () => {
    const { appState, dispatch } = useAppContext();
    const { status, turn, whiteTimer, blackTimer } = appState;

    useEffect(() => {
        let timerInterval: NodeJS.Timeout;

        if (status === 'Ongoing') {
            timerInterval = setInterval(() => {
                if (turn === 'w') {
                    dispatch(updateWhiteTimer(whiteTimer - 1));
                } else {
                    dispatch(updateBlackTimer(blackTimer - 1));
                }
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [status, turn, dispatch, whiteTimer, blackTimer]);

    const formatTime = (time: number): string => {
        const minutes: number = Math.floor(time / 60);
        const seconds: number = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='h-board flex flex-col justify-between items-center' id='timers'>
            <div className='w-[150px] py-3 px-6 bg-foreground rounded flex justify-between items-center'>
                <Image
                    src={bK}
                    width={40}
                    height={40}
                    alt={status}
                />
                <p className='text-sm font-semibold'>
                    {formatTime(blackTimer)}
                </p>
            </div>
            <div className='w-[150px] py-3 px-6 bg-foreground rounded flex justify-between items-center'>
                <Image
                    src={wK}
                    width={40}
                    height={40}
                    alt={status}
                />
                <p className='text-sm font-semibold'>
                    {formatTime(whiteTimer)}
                </p>
            </div>
        </div>
    );
};

export default Timers;
