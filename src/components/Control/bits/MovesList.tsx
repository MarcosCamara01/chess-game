import { useAppContext } from '@/Context'

const MovesList = () => {
    const { appState: { movesList } } = useAppContext();

    return (
        <ul className='h-full text-sm flex flex-col gap-3'>
            {movesList.map((move: [number, number], i: number) => (
                i % 2 === 0 && (
                    <li key={i} className='flex gap-14'>
                        <div className='flex gap-3'>
                            <span className='opacity-60'>
                                {Math.floor(i / 2) + 1}.
                            </span>
                            <span className="">
                                {move}
                            </span>
                        </div>
                        {movesList[i + 1] && (
                            <>
                                <span className="">
                                    {movesList[i + 1]}
                                </span>
                            </>
                        )}
                    </li>
                )
            ))}
        </ul>
    )
}

export default MovesList
