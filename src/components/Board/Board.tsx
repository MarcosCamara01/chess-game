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
    const ranks = Array(8).fill('').map((_, i) => 8 - i);
    const files = Array(8).fill('').map((_, i) => i + 1);

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
        let c = 'relative'
        c += (i + j) % 2 === 0 ? ' bg-light-tile ' : ' bg-dark-tile '
        if (appState.candidateMoves?.find((m: number[]) => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c += ' after:border-[10px] after:block after:absolute after:w-tile after:h-tile after:border-highlight after:rounded-full after:inset-0'
            else
                c += ' after:block after:absolute after:content-[""] after:w-half-tile after:h-half-tile after:bg-highlight after:rounded-full after:inset-1/4'
        }

        if (checkTile && checkTile[0] === i && checkTile[1] === j) {
            c += ' after:block after:absolute after:content-[""] after:w-tile after:h-tile after:bg-check after:inset-0'
        }

        if (i === 0 && j === 0) {
            c += ' rounded-bl ';
        } else if (i === 0 && j === 7) {
            c += ' rounded-br ';
        } else if (i === 7 && j === 0) {
            c += ' rounded-tl ';
        } else if (i === 7 && j === 7) {
            c += ' rounded-tr ';
        }

        return c
    }

    const onClosePopup = () => {
        dispatch(closePopup())
    }

    return (
        <section className='grid grid-cols-25-cols-auto relative' id='board-container'>

            <Ranks ranks={ranks} />

            <div className='grid grid-cols-25-cols-800 grid-rows-25-rows-800 w-board'>
                {ranks.map((rank, i: number) =>
                    files.map((file, j: number) =>
                        <div
                            key={file + '' + rank}
                            data-i={i}
                            data-j={j}
                            className={`${getClassName(7 - i, j)}`}
                        />
                    ))}
            </div>

            <Pieces />

            <Popup>
                <PromotionBox onClosePopup={onClosePopup} />
                <GameEnds />
            </Popup>

            <Files files={files} />

        </section>
    )
}

export default Board