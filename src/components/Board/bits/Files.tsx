import './Files.css'
import { getCharacter } from '../../../helper'

const Files = ({ files }: { files: number[] }) =>
    <div className="files">
        {files.map((file) => <span key={file}>{getCharacter(file)}</span>)}
    </div>

export default Files