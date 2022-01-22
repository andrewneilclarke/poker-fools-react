interface Props {
    currentGameStage: string,
    bigBlind: number,
    smallBlind: number,
    pot: number,

}

const Gameinfo: React.FC<Props> = ({ currentGameStage, bigBlind, smallBlind }) => {
    return (
        <div className="game-info">
            {currentGameStage}
            <p>Blinds: {`${bigBlind} / ${smallBlind}`}</p>
        </div>
    )

}


export default Gameinfo;