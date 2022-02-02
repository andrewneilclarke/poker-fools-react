import './Gameinfo.css'
import { useState } from 'react'
import { RankingResult, PlayerType } from '../Interfaces'
import Player from './Player'

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

    const getWinnerName = (gameResult: RankingResult, players: PlayerType[]): string[] | string => {
        const resultCards = gameResult.winners[0].cards;
        const winningPlayersArr = players.filter(player => player.hand.join(',') === resultCards)
        const namesArr = (winningPlayersArr.map(player => player.name))
        if (namesArr.length > 1) {
            let string = ``
            namesArr.forEach(name => string = string = name + ' ')
            return string
        } else return namesArr[0]


    }
    // || 'straight' || 'flush' || 'full_house'
    const formatWinnerHand = (str: string) => {
        let formattedStr: string;
        if (str.toLowerCase() === 'pair' || 'straight' || 'flush' || 'full_house') {
            formattedStr = `a ${str.toLowerCase().replaceAll('_', ' ')}`
        }
        else {
            formattedStr = `${str.toLowerCase().replaceAll('_', ' ')}`
        }
        return formattedStr
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