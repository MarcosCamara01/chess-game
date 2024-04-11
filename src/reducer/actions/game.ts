import { GameState } from '@/types/types';
import actionTypes from '../actionTypes';
import { initGameState } from '@/constants';

export const initStored = (gameStored: GameState) => ({
    type: actionTypes.INIT_STORED,
    payload: gameStored,
});

export const updateCastling = (direction: string) => ({
    type: actionTypes.CAN_CASTLE,
    payload: direction,
});

export const detectStalemate = () => ({
    type: actionTypes.STALEMATE,
});

export const detectInsufficientMaterial = () => ({
    type: actionTypes.INSUFFICIENT_MATERIAL,
});

export const detectCheckmate = (winner: string) => ({
    type: actionTypes.WIN,
    payload: winner
});

export const setupNewGame = () => ({
    type: actionTypes.NEW_GAME,
    payload: initGameState
});

export const updateWhiteTimer = (newTime: number) => ({
    type: actionTypes.UPDATE_WHITE_TIMER,
    payload: newTime,
});

export const updateBlackTimer = (newTime: number) => ({
    type: actionTypes.UPDATE_BLACK_TIMER,
    payload: newTime,
});
