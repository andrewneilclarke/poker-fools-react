import './Table.css'
import Card from './Card'
import { v4 as uuid } from 'uuid';
import { CardFace, CardName, PlayerType, RankingResult } from '../Interfaces'
import Player from './Player'

interface Props {
    getCardFace: (card: CardName) => CardFace,
    cardBack: CardFace,
    flipped: boolean,
    setFlipped: any,
    flipTable: boolean,
    gameOver: boolean,
    currentGameStage: string,
    table: CardName[],
    bigBlind: number,
    smallBlind: number,
    players: PlayerType[],
    pot: number,
    dispatch: React.Dispatch<any>,
    gameResult: RankingResult,

}

const Table: React.FC<Props> = ({ table, players, pot, gameResult, dispatch, getCardFace, cardBack, flipped, setFlipped, gameOver, currentGameStage, smallBlind, bigBlind, flipTable }) => {
    return (
        <div className="table-container">
            <div className="table-and-players">
                <div className="table-and-pot">
                    <p className="pot">Pot: {pot}</p>
                    <div className="table">
                        <div className="logo">
                            <p>Poker</p>
                            <p> Fools</p>
                        </div>
                        {!gameOver && table.map(card => (
                            <Card key={uuid()} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipTable ? true : false} setFlipped={setFlipped} />
                        ))}
                    </div>
                </div>
                {players && players.map(player => (
                    <Player key={player.name} player={player} players={players} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} smallBlind={smallBlind} bigBlind={bigBlind} dispatch={dispatch} />
                ))}
            </div>
        </div>
    )
}

export default Table
