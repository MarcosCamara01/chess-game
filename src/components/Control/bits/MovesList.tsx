import { useAppContext } from '@/Context';

const MovesList = () => {
    const { appState: { movesList } } = useAppContext();

    return (
        <ul className='h-full text-sm flex flex-col gap-3 overflow-y-auto pt-3'>
            {movesList.map((move: [number, number], i: number) => {
                if (i % 2 === 0) {
                    return (
                        <li key={i} className={`w-full flex justify-between items-center py-1 px-3 rounded ${i % 4 === 1 || i % 4 === 2 ? 'bg-[#2A2926]' : ''}`}>
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
                            <span />
                        </li>
                    );
                } else {
                    return null;
                }
            })}
        </ul>
    );
};

export default MovesList;
