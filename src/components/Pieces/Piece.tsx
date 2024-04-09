import React from 'react';
import arbiter from '@/arbiter/arbiter';
import { useAppContext } from '@/Context';
import { generateCandidates } from '@/reducer/actions/move';
import { PieceInfo } from '@/types/types';

const Piece = ({ rank, file, piece }: PieceInfo) => {
    const { appState, dispatch } = useAppContext();
    const { turn, castleDirection, position: currentPosition } = appState;

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
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

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target) {
            target.style.display = 'block';
        }
    };

    return (
        <div
            className={`piece ${piece} p-${file}${rank}`}
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        />
    );
};

export default Piece;
