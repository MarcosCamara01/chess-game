import React from 'react';
import arbiter from '@/arbiter/arbiter';
import { useAppContext } from '@/Context';
import { generateCandidates } from '@/reducer/actions/move';
import { ChessBoard, PieceInfo } from '@/types/types';
import Image from 'next/image';

const Piece = ({ rank, file, piece, setOnClickEvent }: PieceInfo) => {
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

        genValidMoves()
    };

    const onDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        if (target) {
            target.style.display = 'block';
        }
    };

    const onClickPiece = () => {
        setOnClickEvent({ piece, rank, file });
        genValidMoves();
    };


    const genValidMoves = () => {
        if (turn === piece[0]) {
            const candidateMoves =
                arbiter.getValidMoves({
                    position: currentPosition[currentPosition.length - 1] as ChessBoard,
                    prevPosition: currentPosition[currentPosition.length - 2] as ChessBoard,
                    castleDirection: castleDirection[turn],
                    piece,
                    file,
                    rank
                });
            dispatch(generateCandidates({ candidateMoves }));
        }
    }

    const pieceImageName = `${piece.charAt(0)}${piece.charAt(1).toUpperCase()}`;

    return (
        <div
            className='w-[12.5%] h-[12.5%] absolute cursor-grab'
            style={{ transform: `translate(${translationX}%, ${translationY}%)` }}
        >
            <Image
                className="w-full h-full relative"
                src={`/pieces/${pieceImageName}.png`}
                draggable={true}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onClick={onClickPiece}
                alt={piece}
                width={85}
                height={85}
                id='piece'
            />
        </div>
    );
};

export default Piece;
