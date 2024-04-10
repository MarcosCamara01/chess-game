const Control = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full max-w-[300px] h-board flex flex-col p-6 bg-foreground rounded'>
            {children}
        </div>
    )
}

export default Control