import './Board.css'
import { useAppContext } from '@/Context'

import Ranks from './bits/Ranks'
import Files from './bits/Files'
import Pieces from '../Pieces/Pieces'
import PromotionBox from '../Popup/PromotionBox/PromotionBox'
import Popup from '../Popup/Popup'
import GameEnds from '../Popup/GameEnds/GameEnds'

import arbiter from '../../arbiter/arbiter'
import { getKingPosition } from '../../arbiter/getMoves'
import { closePopup } from '@/reducer/actions/popup';

const Board = () => {
    const ranks = Array(8).fill(undefined).map((_, i) => 8 - i);
    const files = Array(8).fill(undefined).map((_, i) => i + 1);


    const { appState, dispatch } = useAppContext();
    const position = appState.position[appState.position.length - 1]

    const checkTile = (() => {
        const isInCheck = (arbiter.isPlayerInCheck({
            positionAfterMove: position,
            player: appState.turn
        }))

        if (isInCheck)
            return getKingPosition(position, appState.turn)

        return null
    })()

    const getClassName = (i: number, j: number) => {
        let c = 'tile'
        c += (i + j) % 2 === 0 ? ' tile--dark ' : ' tile--light '
        if (appState.candidateMoves?.find((m: number[]) => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c += ' attacking'
            else
                c += ' highlight'
        }

        if (checkTile && checkTile[0] === i && checkTile[1] === j) {
            c += ' checked'
        }

        return c
    }

    const onClosePopup = () => {
        dispatch(closePopup())
    }

    return (
        <div className='board'>

            <Ranks ranks={ranks} />

            <div className='tiles'>
                {ranks.map((rank, i: number) =>
                    files.map((file, j: number) =>
                        <div
                            key={file + '' + rank}
                            data-i={i}
                            data-j={j}
                            className={`${getClassName(7 - i, j)}`} />
                    ))}
            </div>

            <Pieces />

            <Popup>
                <PromotionBox onClosePopup={onClosePopup} />
                <GameEnds />
            </Popup>

            <Files files={files} />

        </div>
    )
}

export default Board