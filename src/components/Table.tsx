import './Table.css'
import Card from './Card'
import { v4 as uuid } from 'uuid';
import { CardType, PlayerType } from '../Interfaces'
import Player from './Player'

interface Props {
    liveDeck: string[],
    getCardFace: (card: string) => CardType,
    cardBack: string,
    flipped: boolean,
    setFlipped: any,
    gameOver: boolean,
    currentGameStage: string,
    table: CardType[],
    bigBlind: number,
    smallBlind: number,
    players: PlayerType[],
    pot: number,
    dispatch: React.Dispatch<any>,
    gameResult:
    {
        winners: string[],
        players: string[],
    };

}

const Table: React.FC<Props> = ({ table, players, pot, gameResult, dispatch, liveDeck, getCardFace, cardBack, flipped, setFlipped, gameOver, currentGameStage, smallBlind, bigBlind }) => {
    return (
        <div className="table-container">
            <div className="table-and-players">
                <p className="pot">Pot: {pot}</p>
                <div className="table">
                    <div className="logo">
                        <p>Poker</p>
                        <p> Fools</p>
                    </div>
                    {!gameOver && table.map(card => (
                        <Card key={uuid()} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
                    ))}
                </div>

                {/* <div className="players">
                    {players && players.map(player => (
                        <Player key={player.name} player={player} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} smallBlind={smallBlind} dispatch={dispatch} />
                    ))}
                </div> */}

                {gameResult && <p>{JSON.stringify(gameResult)}</p>}
            </div>
        </div>






    )
}

export default Table
