import { useState } from 'react'
import { MdPerson } from "react-icons/md";
import { PlayerType } from '../Interfaces'
import Card from "./Card"

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
    const [betAmount, setBetAmount] = useState(0)
    return (

        <div className={player.name} id="player" onClick={() => dispatch({ type: 'make-active', player, players })}>
            <div className="cards">
                {player.hand.map(card => (
                    <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />))
                }
            </div>
            <MdPerson style={{ height: "5em", width: "5em" }} />
            <h4 className="player-info" id="name">{player.name} {player.dealer && 'D'} {player.bigBlind && 'BB'} {player.smallBlind && 'SB'} <p className="stack">{player.stack}</p></h4>


            <div className="player-details">
                {/* <p>{JSON.stringify(player.hand)}</p> */}

                {/* {player.active && (
                    <>
                        <div className="player-buttons">
                            <button onClick={() => setBetAmount(betAmount + smallBlind)}>+</button>
                            <button onClick={() => {
                                if (betAmount > 0) {
                                    setBetAmount(betAmount - smallBlind)
                                }
                            }
                            }>-</button>
                            {player.bet < bigBlind && <button onClick={() => dispatch({ type: 'call', betAmount, player, bigBlind })}>Call {bigBlind}</button>}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                dispatch({ type: 'submit-bet', betAmount, player });
                                setBetAmount(0)
                                console.log(betAmount, player)
                            }}>
                                {betAmount > 0 && <button type='submit' className='submit'>Bet {betAmount}</button>

                                }
                                {betAmount}
                                {player.bet}
                            </form>

                        </div>

                    </>
                )
                } */}
            </div>

        </div>

    )
}

export default Player
