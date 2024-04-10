import React from 'react';
import arbiter from '@/arbiter/arbiter';
import { useAppContext } from '@/Context';
import { generateCandidates } from '@/reducer/actions/move';
import { PieceInfo } from '@/types/types';
import Image from 'next/image';

const Piece = ({ rank, file, piece }: PieceInfo) => {
    const { appState, dispatch } = useAppContext();
    const { turn, castleDirection, position: currentPosition } = appState;

    const translationX = file * 100; 
    const translationY = (7 - rank) * 100; 

    const onDragStart = (e: React.DragEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        if (target) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
            setTimeout(() => {
                target.style.display = 'none';
            }, 0);
        }

        if (turn === piece[0]) {
            const candidateMoves =
                arbiter.getValidMoves({
                    position: currentPosition[currentPosition.length - 1],
                    prevPosition: currentPosition[currentPosition.length - 2],
                    castleDirection: castleDirection[turn],
                    piece,
                    file,
                    rank
                });
            dispatch(generateCandidates({ candidateMoves }));
        }
    };

    const onDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        if (target) {
            target.style.display = 'block';
        }
    };

    return (
        <Image
            className="w-[12.5%] h-[12.5%] absolute cursor-grab"
            src={`/pieces/${piece}.png`}
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            alt={piece}
            width={100}
            height={100}
            style={{ transform: `translate(${translationX}%, ${translationY}%)` }}
        />
    );
};

export default Piece;
