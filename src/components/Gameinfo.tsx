import './Gameinfo.css'

interface Props {
    currentGameStage: string,
    bigBlind: number,
    smallBlind: number,
    pot: number,

}

const Gameinfo: React.FC<Props> = ({ currentGameStage, bigBlind, smallBlind, pot }) => {
    return (
        <div className="game-info">
            <p>Stage: {currentGameStage}</p>
            <p>Blinds: {`${bigBlind} / ${smallBlind}`}</p>
            <p>Current Pot: {pot}</p>
        </div>
    )

}


export default Gameinfo;