import Piece from './Piece'
import { useRef } from 'react'
import { useAppContext } from '@/Context'
import { openPromotion } from '@/reducer/actions/popup'
import { getCastlingDirections } from '@/arbiter/getMoves'
import {
    updateCastling,
    detectStalemate,
    detectInsufficientMaterial,
    detectCheckmate
} from '@/reducer/actions/game'

import { makeNewMove, clearCandidates } from '../../reducer/actions/move'
import arbiter from '../../arbiter/arbiter'
import { getNewMoveNotation } from '../../helper'
import { ChessBoard, UpdateCastlingState, OpenPromotionBox, Moves } from '@/types/types'

const Pieces = () => {

    const { appState, dispatch } = useAppContext();
    const currentPosition: ChessBoard = appState.position[appState.position.length - 1]

    const ref = useRef<HTMLDivElement>(null)

    const updateCastlingState = ({ piece, file, rank }: UpdateCastlingState) => {
        const direction = getCastlingDirections({
            castleDirection: appState.castleDirection,
            piece,
            file,
            rank
        })
        if (direction) {
            dispatch(updateCastling(direction))
        }
    }

    const openPromotionBox = ({ rank, file, x, y }: OpenPromotionBox) => {
        dispatch(openPromotion({
            rank: Number(rank),
            file: Number(file),
            x,
            y
        }))
    }

    const calculateCoords = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return { x: 0, y: 0 };
        const { top, left, width } = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)

        return { x, y }
    }

    const move = (e: React.DragEvent<HTMLDivElement>) => {
        const { x, y } = calculateCoords(e)
        const [piece, rankStr, fileStr] = e.dataTransfer.getData("text").split(',')

        const rank = parseInt(rankStr);
        const file = parseInt(fileStr);

        if (appState.candidateMoves.find((m: [number, number]) => m[0] === x && m[1] === y)) {
            const opponent = piece.startsWith('b') ? 'w' : 'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'white' : 'black'}`]

            if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
                openPromotionBox({ rank: Number(rank), file: Number(file), x, y })
                return
            }
            if (piece.endsWith('r') || piece.endsWith('k')) {
                updateCastlingState({ piece, file, rank })
            }
            const newPosition: any = arbiter.performMove({
                position: currentPosition,
                piece, rank: Number(rank), file: Number(file),
                x, y
            })
            const newMove = getNewMoveNotation({
                piece,
                rank: Number(rank),
                file: Number(file),
                x,
                y,
                position: currentPosition,
            })
            dispatch(makeNewMove({ newPosition, newMove }))

            if (arbiter.insufficientMaterial(newPosition))
                dispatch(detectInsufficientMaterial())
            else if (arbiter.isStalemate(newPosition, opponent, castleDirection)) {
                dispatch(detectStalemate())
            }
            else if (arbiter.isCheckMate(newPosition, opponent, castleDirection)) {
                dispatch(detectCheckmate(piece[0]))
            }
        }
        dispatch(clearCandidates())
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        move(e)
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault() }

    return <div
        className='absolute top-0 right-0 left-quarter bottom-quarter'
        ref={ref}
        onDrop={onDrop}
        onDragOver={onDragOver} >
        {currentPosition.map((r: string[], rank: number) =>
            r.map((f: string, file: number) =>
                currentPosition[rank][file]
                    ? <Piece
                        key={rank + '-' + file}
                        rank={rank}
                        file={file}
                        piece={currentPosition[rank][file]}
                    />
                    : null
            )
        )}
    </div>
}

export default Pieces
