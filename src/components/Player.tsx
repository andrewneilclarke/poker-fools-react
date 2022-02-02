import { useState } from 'react'
import { CardName, PlayerType } from '../Interfaces'
import Card from "./Card"

interface Props {
    player: PlayerType,
    getCardFace: (card: string) => string,
    cardBack: string,
    flipped: boolean,
    setFlipped: any,
    dispatch: React.Dispatch<any>,
    smallBlind: number
}

const Player: React.FC<Props> = ({ player, getCardFace, cardBack, flipped, setFlipped, dispatch, smallBlind }) => {
    const [betAmount, setBetAmount] = useState(0)

    return (
        <div className={player.name} onClick={() => dispatch({ type: 'make-active', player })}>
            <p>{player.name.toUpperCase()} {player.dealer && 'D'} {player.bigBlind && 'BB'} {player.smallBlind && 'SB'}</p>
            <p>{player.stack}</p>
            <div className="cards">
                {player.hand.map(card => (
                    <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />))
                }
            </div>

            <div className="player-details">
                <p>{JSON.stringify(player.hand)}</p>

                {player.active && (
                    <>
                        <div className="player-buttons">
                            <button onClick={() => setBetAmount(betAmount + smallBlind)}>+</button>
                            <button onClick={() => {
                                if (betAmount > 0) {
                                    setBetAmount(betAmount - smallBlind)
                                }
                            }
                            }>-</button>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                dispatch({ type: 'submit-bet', betAmount, player });
                                setBetAmount(0)
                                console.log(betAmount, player)
                            }}>
                                {betAmount > 0 && <button type='submit' className='submit'>Bet {betAmount}</button>

                                }
                            </form>

                        </div>

                        <div>{betAmount}</div>
                        <div>{player.bet}</div>
                    </>
                )
                }
            </div>

        </div>
    )
}

export default Player
