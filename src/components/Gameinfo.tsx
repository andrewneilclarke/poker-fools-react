import './Gameinfo.css'
import { useState } from 'react'
import { RankingResult, PlayerType } from '../Interfaces'

interface Props {
    currentGameStage: string,
    bigBlind: number,
    smallBlind: number,
    pot: number,
    gameResult: RankingResult,
    players: PlayerType[],
}

const Gameinfo: React.FC<Props> = ({ currentGameStage, bigBlind, smallBlind, pot, gameResult, players }) => {
    const [message, setMessage] = useState<string>('')

    const getWinnerName = (gameResult, players) => {
        console.log(gameResult, players)
        return 'test'
    }

    const formatWinnerHand = (str: string) => {
        if (str.toLowerCase() === 'pair' || 'straight' || 'flush' || 'full_house') {
            return `a ${str.toLowerCase().replaceAll('_', ' ')}`
        } else return `${str.toLowerCase().replaceAll('_', ' ')}`
    }

    return (
        <div className="game-info">
            <p>Stage: {currentGameStage}</p>
            <p>Blinds: {`${bigBlind} / ${smallBlind}`}</p>
            <p>Current Pot: {pot}</p>
            <p>Result: {message}</p>
            <p>{gameResult.winners.length === 1 && `${getWinnerName(gameResult, players)} wins with ${formatWinnerHand(gameResult.winners[0].result)}`}</p>
        </div>
    )

}


export default Gameinfo;