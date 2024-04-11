import { createPosition } from './helper'

export const Status = {
    'ongoing': 'Ongoing',
    'promoting': 'Promoting',
    'white': 'White wins',
    'black': 'Black wins',
    'stalemate': 'Game draws due to stalemate',
    'insufficient': 'Game draws due to insufficient material',
}

export const initGameState = {
    position: [createPosition()],
    turn: 'w',
    candidateMoves: [],
    movesList: [],
    allPositionList: [],
    allMovesList: [],
    promotionSquare: null,
    status: Status.ongoing,
    whiteTimer: 600,
    blackTimer: 600,
    castleDirection: {
        w: 'both',
        b: 'both'
    },
};