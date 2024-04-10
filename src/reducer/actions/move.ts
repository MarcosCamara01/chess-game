import { MakeNewMove, Moves } from '@/types/types';
import actionTypes from '../actionTypes';

export const makeNewMove = ({ newPosition, newMove }: MakeNewMove) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: { newPosition, newMove },
    }
}

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}

export const generateCandidates = ({ candidateMoves }: { candidateMoves: Moves }) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: { candidateMoves }
    }
}

export const takeBack = () => {
    return {
        type: actionTypes.TAKE_BACK,
    }
}

export const moveForward = () => {
    return {
        type: actionTypes.MOVE_FORWARD,
    }
}
