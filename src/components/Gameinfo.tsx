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
    myError: any,
}

const Gameinfo: React.FC<Props> = ({ currentGameStage, bigBlind, smallBlind, pot, gameResult, players, myError }) => {
    const [message, setMessage] = useState<string>('')

    const getWinnerName = (gameResult: RankingResult, players: PlayerType[]): string[] | string => {
        const resultCards = gameResult.winners[0].cards;
        const winningPlayersArr = players.filter(player => player.hand.join(',') === resultCards)
        const namesArr = (winningPlayersArr.map(player => player.name))
        if (namesArr.length > 1) {
            console.log(namesArr)
            return namesArr
            // let string = ``
            // namesArr.forEach(name => console.log('winner: ', name))
            // return string
        } else return namesArr[0]
    }
    // || 'straight' || 'flush' || 'full_house'
    const formatWinnerHand = (str: string) => {
        let formattedStr = str.toLowerCase()
        if (formattedStr === 'pair' || formattedStr === 'straight' || formattedStr === 'flush' || formattedStr === 'full_house') {
            formattedStr = `a ${formattedStr.replaceAll('_', ' ')}`
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
            {message && <p>{message}</p>}

            {gameResult.winners.length === 1 && getWinnerName(gameResult, players) !== undefined &&
                <p className="winner">{`${getWinnerName(gameResult, players)} wins with ${formatWinnerHand(gameResult.winners[0].result)} ${gameResult.winners[0].hand}`}</p>
            }
            {myError && <p>{myError}</p>}

        </div >
    )

}


export default Gameinfo;