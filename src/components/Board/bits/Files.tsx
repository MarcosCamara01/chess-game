import { getCharacter } from '../../../helper'

const Files = ({ files }: { files: number[] }) => (
    <div className="h-quarter col-start-2 col-end-10 flex justify-around items-center">
        {files.map((file) => (
            <span
                key={file}
                className='text-dark-tile font-semibold'
                id='column-items'
            >
                {getCharacter(file)}
            </span>
        ))}
    </div>
)

export default Files