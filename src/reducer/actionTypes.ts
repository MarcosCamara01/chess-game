enum ActionTypes {
    CAN_CASTLE = "CAN_CASTLE",
    CLEAR_CANDIDATE_MOVES = "CLEAR_CANDIDATE_MOVES",
    GENERATE_CANDIDATE_MOVES = "GENERATE_CANDIDATE_MOVES",
    NEW_MOVE = "NEW_MOVE",
    NEW_GAME = "NEW_GAME",
    PROMOTION_CLOSE = "PROMOTION_CLOSE",
    PROMOTION_OPEN = "PROMOTION_OPEN",
    STALEMATE = "STALEMATE",
    INSUFFICIENT_MATERIAL = "INSUFFICIENT_MATERIAL",
    WIN = "WIN",
    TAKE_BACK = "TAKE_BACK",
    MOVE_FORWARD = "MOVE_FORWARD",
}

export default ActionTypes;