import {
    ChessBoard,
    EnemyPieces,
    GetRegularMoves,
    GetValidMoves,
    IsPlayerInCheck,
    Moves,
    PerformMove,
    Piece
} from '@/types/types';
import { areSameColorTiles, findPieceCoords } from '../helper';
import {
    getKnightMoves,
    getRookMoves,
    getBishopMoves,
    getQueenMoves,
    getKingMoves,
    getPawnMoves,
    getPawnCaptures,
    getCastlingMoves,
    getPieces,
    getKingPosition
} from './getMoves'
import { movePiece, movePawn } from './move';

const arbiter = {

    getRegularMoves: function ({ position, piece, rank, file }: GetRegularMoves): Moves {
        if (piece.endsWith('n')) {
            return getKnightMoves({ position, rank, file });
        } else if (piece.endsWith('b')) {
            return getBishopMoves({ position, piece, rank, file });
        } else if (piece.endsWith('r')) {
            return getRookMoves({ position, piece, rank, file });
        } else if (piece.endsWith('q')) {
            return getQueenMoves({ position, piece, rank, file });
        } else if (piece.endsWith('k')) {
            return getKingMoves({ position, piece, rank, file });
        } else if (piece.endsWith('p')) {
            return getPawnMoves({ position, piece, rank, file });
        } else {
            return [];
        }
    },

    getValidMoves: function ({
        position,
        castleDirection,
        prevPosition,
        piece,
        rank,
        file
    }: GetValidMoves) {
        let moves: Moves = this.getRegularMoves({ position, piece, rank, file });
        const notInCheckMoves: Moves = [];

        if (piece.endsWith('p')) {
            const pawnCaptures = getPawnCaptures({ position, prevPosition, piece, rank, file });
            if (pawnCaptures) {
                moves.push(...pawnCaptures);
            }
        }
        if (piece.endsWith('k')) {
            const castlingMoves = getCastlingMoves({ position, castleDirection, piece, rank, file });
            if (castlingMoves) {
                moves.push(...castlingMoves);
            }
        }

        if (moves) {
            moves.forEach(([x, y]: [number, number]) => {
                const positionAfterMove = this.performMove({ position, piece, rank, file, x, y });

                if (positionAfterMove && !this.isPlayerInCheck({ positionAfterMove, position, player: piece[0] })) {
                    notInCheckMoves.push([x, y]);
                }
            });
        }
        return notInCheckMoves;
    },

    isPlayerInCheck: function ({ positionAfterMove, position, player }: IsPlayerInCheck) {
        const enemy = player.startsWith('w') ? 'b' : 'w';
        const kingPos = getKingPosition(positionAfterMove, player);
        const enemyPieces = getPieces(positionAfterMove, enemy) as EnemyPieces;

        const enemyMoves: Moves = enemyPieces.reduce((acc: Moves, p: Piece) => {
            return [
                ...acc,
                ...(p.piece.endsWith('p')
                    ? getPawnCaptures({
                        position: positionAfterMove,
                        prevPosition: position,
                        ...p
                    }) as Moves
                    : this.getRegularMoves({
                        position: positionAfterMove,
                        ...p
                    }))
            ];
        }, []);

        if (kingPos && enemyMoves.some(([x, y]: [number, number]) => kingPos[0] === x && kingPos[1] === y)) {
            return true;
        } else {
            return false;
        }
    },

    performMove: function ({ position, piece, rank, file, x, y }: PerformMove) {
        if (piece.endsWith('p'))
            return movePawn({ position, piece, rank, file, x, y })
        else
            return movePiece({ position, piece, rank, file, x, y })
    },

    isStalemate: function (position: ChessBoard, player: string, castleDirection: string) {
        const isInCheck = this.isPlayerInCheck({ positionAfterMove: position, player })

        if (isInCheck)
            return false

        const pieces = getPieces(position, player)
        const moves = pieces.reduce((acc: any, p: any) => acc = [
            ...acc,
            ...(this.getValidMoves({
                position,
                castleDirection,
                ...p
            })
            )
        ], [])

        return (!isInCheck && moves.length === 0)
    },

    insufficientMaterial: function (position: ChessBoard) {

        const pieces =
            position.reduce((acc: string[], rank: string[]) =>
                acc = [
                    ...acc,
                    ...rank.filter((spot: string) => spot)
                ], [])

        // King vs. king
        if (pieces.length === 2)
            return true


        if (pieces.length === 3 && pieces.some((p: string) => p.endsWith('b') || p.endsWith('n')))
            return true

        // King and bishop vs. king and bishop of the same color as the opponent's bishop
        if (pieces.length === 4 &&
            pieces.every((p: string) => p.endsWith('b') || p.endsWith('k')) &&
            new Set(pieces).size === 4 &&
            areSameColorTiles(
                findPieceCoords(position, 'wb')[0],
                findPieceCoords(position, 'bb')[0]
            )
        )
            return true

        return false
    },

    isCheckMate: function (position: ChessBoard, player: string, castleDirection: ChessBoard) {
        const isInCheck = this.isPlayerInCheck({ positionAfterMove: position, player })

        if (!isInCheck)
            return false

        const pieces = getPieces(position, player)
        const moves = pieces.reduce((acc: any, p: any) => acc = [
            ...acc,
            ...(this.getValidMoves({
                position,
                castleDirection,
                ...p
            })
            )
        ], [])

        return (isInCheck && moves.length === 0)
    },
}

export default arbiter