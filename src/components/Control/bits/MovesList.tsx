import { useAppContext } from '@/Context'
import './MovesList.css'

const MovesList = () => {

    const { appState: { movesList } } = useAppContext();

    return <div className='moves-list'>
        {movesList.map((move: [number, number], i: number) =>
            <div key={i} data-number={Math.floor(i / 2) + 1}>{move}</div>
        )}
    </div>
}

export default MovesList