import './Ranks.css'

const Ranks = ({ ranks }: { ranks: number[] }) => {
    return (
        <div className="ranks">
            {ranks.map(rank => <span key={rank}>{rank}</span>)}
        </div>
    )
}

export default Ranks