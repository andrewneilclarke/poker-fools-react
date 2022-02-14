import './Gameinfo.css'
import { RankingResult, PlayerType } from '../Interfaces'
import { getWinnerName, formatWinnerHand } from '../Functions'

interface Props {
    currentGameStage: string,
    bigBlind: number,
    smallBlind: number,
    pot: number,
    gameResult: RankingResult,
    players: PlayerType[],
    myError: any,
}

const Gameinfo: React.FC<Props> = ({ currentGameStage, bigBlind, smallBlind, pot, gameResult, players, myError }) => {
    return (
        <div className="game-info">
            <p>Stage: {currentGameStage}</p>
            <p>Blinds: {`${bigBlind} / ${smallBlind}`}</p>
            <p>Current Pot: {pot}</p>
            {gameResult.winners !== [] && gameResult.winners.length === 1 && getWinnerName(gameResult, players) !== undefined &&
                <p className="winner">{`${getWinnerName(gameResult, players)} wins with ${formatWinnerHand(gameResult.winners[0].result)} ${gameResult.winners[0].hand}`}</p>
            }
            {myError && <p>{myError}</p>}
        </div >
    )
}

export default Gameinfo;