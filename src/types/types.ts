export type ChessBoard = string[][];

export interface GameState {
    position: ChessBoard | ChessBoard[];
    turn: string;
    candidateMoves: [number, number][];
    movesList: Moves;
    allMovesList: Moves;
    allPositionList: ChessBoard;
    promotionSquare: { [key: string]: any } | null;
    whiteTimer: number,
    blackTimer: number,
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
    positionAfterMove: ChessBoard | string[][];
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

export interface GetNewMoveNotation {
    position: ChessBoard;
    piece?: string;
    rank?: number;
    file?: number;
    x: number;
    y: number;
    promotesTo?: string;
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
    setOnClickEvent: (data: { piece: string; rank: number; file: number }) => void;
}

export interface Piece {
    piece: string;
    rank: number;
    file: number;
};

export type EnemyPieces = Piece[];

export type Action = {
    type: string;
    payload?: any;
};

export interface MakeNewMove {
    newPosition: number[][];
    newMove: string;
}

export type ChessCoords = {
    x: number;
    y: number;
};