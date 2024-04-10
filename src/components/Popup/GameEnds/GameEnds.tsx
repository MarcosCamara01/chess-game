import { Status } from '@/constants';
import { useAppContext } from '@/Context'
import { setupNewGame } from '@/reducer/actions/game';
import Image from 'next/image';
import bK from "../../../../public/pieces/bK.png"
import wK from "../../../../public/pieces/wK.png"

const GameEnds = () => {
    const { appState: { status }, dispatch } = useAppContext();

    if (status === Status.ongoing || status === Status.promoting)
        return null

    const newGame = () => {
        dispatch(setupNewGame())
    }

    const firstLetter = status.charAt(0);

    const isWin = status.endsWith('wins')

    return (
        <div className="absolute left-[25%] top-[35%] border-8 border-light-tile w-1/2 min-h-[30%] bg-light-tile shadow-custom text-center p-3 flex flex-col justify-between items-center">
            <h1 className='text-black text-3xl font-semibold'>{isWin ? status : 'Draw'}</h1>
            {!isWin && <p>{status}</p>}
            {
                status !== "draws" ?
                    <Image
                        src={firstLetter === "W" ? wK : bK}
                        width={100}
                        height={100}
                        alt={status}
                    />
                    :
                    <div className='flex gap-3'>
                        <Image
                            src={wK}
                            width={100}
                            height={100}
                            alt={status}
                        />
                        <Image
                            src={bK}
                            width={100}
                            height={100}
                            alt={status}
                        />
                    </div>
            }
            <button
                onClick={newGame}
                className='text-black text-base font-semibold'
            >
                New Game
            </button>
        </div>
    )

}

export default GameEnds