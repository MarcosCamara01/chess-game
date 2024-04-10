import { getCharacter } from '../../../helper'

const Files = ({ files }: { files: number[] }) => (
    <div className="text-dark-tile h-quarter col-start-2 col-end-10	flex justify-around items-center">
        {files.map((file) => <span key={file}>{getCharacter(file)}</span>)}
    </div>
)

export default Files