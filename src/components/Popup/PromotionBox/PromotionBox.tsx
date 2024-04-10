import { useAppContext } from '@/Context'
import { copyPosition, getNewMoveNotation, } from '@/helper';
import { makeNewMove, clearCandidates } from '@/reducer/actions/move';
import { PromotionBoxProps } from '@/types/types';
import Image from 'next/image';

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
        <div className="absolute flex items-center top-0 left-[25%] border-8 border-light-tile w-1/2 min-h-[110px] bg-light-tile shadow-custom">
            {options.map(option => (
                <div
                    key={option}
                    className='w-[25%] h-full border border-dark-tile transition-all hover:shadow-promotion'
                >
                    <Image
                        className='h-full w-full cursor-pointer transition-all hover:scale-105'
                        onClick={() => onClick(option)}
                        src={`/pieces/${color}${option}.png`}
                        alt={color + option}
                        width={85}
                        height={85}
                    />
                </div>
            )
            )}
        </div>
    )

}

export default PromotionBox