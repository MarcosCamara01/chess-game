"use client"

import { Status } from "@/constants";
import ActionTypes from "./actionTypes";
import { Action, GameState } from "@/types/types";

export const reducer = (state: GameState, action: Action) => {
    switch (action.type) {

        case ActionTypes.INIT_STORED: {
            return {
                ...action.payload,
            };
        }

        case ActionTypes.NEW_MOVE: {
            let { position, movesList, turn } = state;
            position = [
                ...position,
                action.payload.newPosition
            ];
            movesList = [
                ...movesList,
                action.payload.newMove
            ];
            turn = turn === 'w' ? 'b' : 'w';

            return {
                ...state,
                position,
                movesList,
                turn,
            };
        }

        case ActionTypes.GENERATE_CANDIDATE_MOVES: {
            const { candidateMoves } = action.payload;
            return {
                ...state,
                candidateMoves
            };
        }

        case ActionTypes.CLEAR_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves: []
            };
        }

        case ActionTypes.PROMOTION_OPEN: {
            return {
                ...state,
                status: Status.promoting,
                promotionSquare: { ...action.payload },
            };
        }

        case ActionTypes.PROMOTION_CLOSE: {
            return {
                ...state,
                status: Status.ongoing,
                promotionSquare: null,
            };
        }

        case ActionTypes.CAN_CASTLE: {
            let { turn, castleDirection } = state;

            castleDirection[turn] = action.payload;

            return {
                ...state,
                castleDirection,
            };
        }

        case ActionTypes.STALEMATE: {
            return {
                ...state,
                status: Status.stalemate
            };
        }

        case ActionTypes.INSUFFICIENT_MATERIAL: {
            return {
                ...state,
                status: Status.insufficient
            };
        }

        case ActionTypes.WIN: {
            return {
                ...state,
                status: action.payload === 'w' ? Status.white : Status.black
            };
        }

        case ActionTypes.NEW_GAME: {
            return {
                ...action.payload,
            };
        }

        case ActionTypes.TAKE_BACK: {
            let { position, movesList, turn, allPositionList, allMovesList } = state;
            const currentPositionIndex = position.length - 1;
            const idexAfterThisMove = position.length - 2;

            if (currentPositionIndex > 0) {
                allPositionList = allPositionList.concat(position);
                allMovesList = allMovesList.concat(movesList);
                position = position.slice(0, currentPositionIndex);
                movesList = movesList.slice(0, idexAfterThisMove);
                turn = turn === 'w' ? 'b' : 'w';
            }
            console.log(allMovesList)
            return {
                ...state,
                position,
                movesList,
                turn,
                allMovesList,
                allPositionList
            };
        }

        case ActionTypes.MOVE_FORWARD: {
            let { position, movesList, turn, allPositionList, allMovesList } = state;

            const currentPositionIndex = position.length + 1;
            const idexAfterThisMove = position.length;

            if (allPositionList.length > 0) {
                position = allPositionList.slice(0, currentPositionIndex);
                movesList = allMovesList.slice(0, idexAfterThisMove);
                turn = turn === 'w' ? 'w' : 'b';
            }

            return {
                ...state,
                position,
                movesList,
                turn,
            };
        }

        default:
            return state;
    }
};
