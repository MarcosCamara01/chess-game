import { useAppContext } from '@/Context'
import { copyPosition, getNewMoveNotation, } from '@/helper';
import { makeNewMove, clearCandidates } from '@/reducer/actions/move';
import './PromotionBox.css'
import { PromotionBoxProps } from '@/types/types';

const PromotionBox = ({ onClosePopup }: PromotionBoxProps) => {

    const { appState, dispatch } = useAppContext();
    const { promotionSquare } = appState;

    if (!promotionSquare)
        return null

    const color = promotionSquare.x === 7 ? 'w' : 'b'
    const options = ['q', 'r', 'b', 'n']

    const onClick = (option: string) => {
        onClosePopup()
        const newPosition = copyPosition(appState.position[appState.position.length - 1])

        newPosition[promotionSquare.rank][promotionSquare.file] = ''
        newPosition[promotionSquare.x][promotionSquare.y] = color + option
        const newMove = getNewMoveNotation({
            ...appState.selectedPiece,
            x: promotionSquare.rank,
            y: promotionSquare.file,
            position: appState.position[appState.position.length - 1],
            promotesTo: option
        })
        dispatch(clearCandidates())

        dispatch(makeNewMove({ newPosition, newMove }))

    }

    return (
        <div className="popup--inner promotion-choices">
            {options.map(option =>
                <div key={option}
                    onClick={() => onClick(option)}
                    className={`piece ${color}${option}`}
                />
            )}
        </div>
    )

}

export default PromotionBox