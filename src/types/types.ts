export type ChessBoard = string[][];

export interface GameState {
    position: string[][];
    turn: string;
    candidateMoves: [number, number][];
    movesList: Moves;
    allMovesList: Moves;
    allPositionList: string[][];
    promotionSquare: { [key: string]: any } | null;
    status: string;
    castleDirection: {
        [key: string]: string;
    };
};

export interface GetRegularMoves {
    position: ChessBoard;
    piece: string;
    rank: number;
    file: number
}

export interface GetValidMoves {
    position: ChessBoard;
    castleDirection: string;
    prevPosition: ChessBoard;
    piece: string;
    rank: number;
    file: number
}

export interface IsPlayerInCheck {
    positionAfterMove: ChessBoard;
    position?: ChessBoard;
    player: string;
}

export interface PerformMove {
    position: ChessBoard;
    piece: string;
    rank: number;
    file: number;
    x: number;
    y: number;
}

export interface UpdateCastlingState {
    piece: string;
    file: number;
    rank: number;
}

export interface OpenPromotionBox {
    rank: number;
    file: number;
    x: number;
    y: number;
}

export interface PromotionBoxProps {
    onClosePopup: () => void;
}

export interface GetKnightMoves {
    position: ChessBoard;
    rank: number;
    file: number
}

export interface GetPawnCaptures {
    position: ChessBoard;
    prevPosition: ChessBoard | undefined;
    piece: string;
    rank: number;
    file: number
}

export interface GetCastlingMoves {
    position: ChessBoard;
    castleDirection: string;
    piece: string;
    rank: number;
    file: number
}

export interface GetCastlingDirections {
    castleDirection: {
        [key: string]: string;
    };
    piece: string;
    rank: number;
    file: number
}

type Move = [number, number];
export type Moves = Move[];

export interface PieceInfo {
    piece: string;
    rank: number;
    file: number;
}

export interface Piece {
    piece: string;
    rank: number;
    file: number;
};

export type EnemyPieces = Piece[];

export type Action = {
    type: string;
    payload: any;
};

export interface MakeNewMove {
    newPosition: number[][];
    newMove: string;
}