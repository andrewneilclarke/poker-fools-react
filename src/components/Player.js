import { useState } from 'react'
import Card from "./Card"

const Player = ({ card, player, getCardFace, cardBack, flipped, setFlipped, smallBlind, dispatch }) => {
    const [betAmount, setBetAmount] = useState(0)
    return (
        <div className={player.name}>
            <p>{player.name.toUpperCase()} {player.dealer && 'D'} {player.bigBlind && 'BB'} {player.smallBlind && 'SB'}</p>
            <div className="cards">
                {player.cards.map(card => (
                    <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />))
                }
            </div>

            <div className="player-details">
                <p>{JSON.stringify(player.cards)}</p>
                <p>{JSON.stringify(player.stack)}</p>
                {player.active && (
                    <>
                        <form className="buttons" onSubmit={(e) => {
                            e.preventDefault();
                            dispatch({ type: 'submit-bet', betAmount });
                            setBetAmount(0)
                        }}>
                            <button onClick={() => setBetAmount(betAmount + smallBlind)}>Bet +</button>
                            <button onClick={() => setBetAmount(betAmount - smallBlind)}>Bet -</button>
                            <button type='submit'>OK</button>
                        </form>
                        <div>{betAmount}</div>
                    </>
                )
                }
            </div>

        </div>
    )
}

export default Player
