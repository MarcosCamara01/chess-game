import { useAppContext } from '@/Context'

const MovesList = () => {
    const { appState: { movesList } } = useAppContext();

    return (
        <ul className='h-full text-sm flex flex-col gap-3 overflow-y-auto pt-3'>
            {movesList.map((move: [number, number], i: number) => (
                i % 2 === 0 && (
                    <li key={i} className='w-1/2 flex justify-between'>
                        <div className='flex gap-3'>
                            <span className='opacity-60'>
                                {Math.floor(i / 2) + 1}.
                            </span>
                            <span className="">
                                {move}
                            </span>
                        </div>
                        {movesList[i + 1] && (
                            <span>
                                {movesList[i + 1]}
                            </span>
                        )}
                    </li>
                )
            ))}
        </ul>
    )
}

export default MovesList
