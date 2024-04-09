import './Control.css'

const Control = ({ children }: { children: React.ReactNode }) => {
    return <div className='control'>
        {children}
    </div>
}

export default Control