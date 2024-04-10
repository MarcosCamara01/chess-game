const Ranks = ({ ranks }: { ranks: number[] }) => (
    <div className="text-dark-tile flex flex-col items-center justify-around">
        {ranks.map(rank => <span key={rank}>{rank}</span>)}
    </div>
)

export default Ranks