const Control = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full max-w-[300px] h-board flex flex-col gap-5 p-3 bg-foreground rounded'>
            {children}
        </div>
    )
}

export default Control