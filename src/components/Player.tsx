import { MdPerson } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { PlayerType } from '../Interfaces'
import Card from "./Card"
import PlayerControls from './PlayerControls';

interface Props {
    player: PlayerType,
    players: PlayerType[]
    getCardFace: (card: string) => string,
    cardBack: string,
    flipped: boolean,
    setFlipped: any,
    dispatch: React.Dispatch<any>,
    smallBlind: number,
    bigBlind: number,
}

const Player: React.FC<Props> = ({ player, players, getCardFace, cardBack, flipped, setFlipped, dispatch, smallBlind, bigBlind }) => {
    return (
        <div className={player.name} id={player.folded ? "player folded" : "player"} onClick={() => dispatch({ type: 'make-active', player, players })}>
            {player.bet > 0 && <p>{player.bet}</p>}
            <MdPerson style={{ height: "4em", width: "4em" }} />

            {player.dealer && 'D'} {player.bigBlind && 'BB'} {player.smallBlind && 'SB'}

            <div className="name-and-stack">
                <p className="name" id="name">{player.name}</p>
                <p className="stack">{player.stack}</p>
            </div>

            <div className="cards">
                {player.hand.map(card => (
                    <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />))
                }
            </div>

            {player.active && <PlayerControls bigBlind={bigBlind} dispatch={dispatch} player={player} players={players} setFlipped={setFlipped} smallBlind={smallBlind} />}
        </div>
    )
}

export default Player
