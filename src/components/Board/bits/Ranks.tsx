const Ranks = ({ ranks }: { ranks: number[] }) => (
    <div className="flex flex-col items-center justify-around">
        {ranks.map(rank => (
            <span
                key={rank}
                className="text-dark-tile font-semibold"
            >
                {rank}
            </span>
        ))}
    </div>
)

export default Ranks