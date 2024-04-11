import { useAppContext } from '@/Context'
import { moveForward, takeBack } from '@/reducer/actions/move';
import { RiArrowUpDownLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRotateRight } from "react-icons/fa6";
import { setupNewGame } from '@/reducer/actions/game';

const ActionButtons = () => {

    const { dispatch } = useAppContext();

    const rotateBoard = () => {
        const boardContainer = document.getElementById('board-container');
        const pieces = document.querySelectorAll('#piece');
        const columnItems = document.querySelectorAll('#column-items');
        if (boardContainer && pieces && columnItems) {
            boardContainer.classList.toggle('rotate-180');
            pieces.forEach(piece => {
                piece.classList.toggle('rotate-180');
            });
            columnItems.forEach(item => {
                item.classList.toggle('rotate-180');
            });
        }
    }    

    return (
        <div className='flex gap-3 justify-between bg-[#21201D]'>
            <button
                onClick={() => dispatch(takeBack())}
                className='p-3 opacity-60 transition-all hover:opacity-100'
            >
                <IoIosArrowBack className='text-3xl' />
            </button>
            <button
                onClick={() => dispatch(moveForward())}
                className='p-3 opacity-60 transition-all hover:opacity-100'
            >
                <IoIosArrowForward className='text-3xl' />
            </button>
            <button
                onClick={() => dispatch(setupNewGame())}
                className='p-3 opacity-60 transition-all hover:opacity-100'
            >
                <FaArrowRotateRight className='text-2xl' />
            </button>
            <button
                onClick={rotateBoard}
                className='p-3 opacity-60 transition-all hover:opacity-100'
            >
                <RiArrowUpDownLine className='text-3xl' />
            </button>
        </div>
    )
}

export default ActionButtons