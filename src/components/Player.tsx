import { useState } from 'react'
import Card from "./Card"

const Player = (getCardFace: any, cardBack: any, flipped: boolean, setFlipped: boolean, player: any, smallBlind: number, dispatch: any) => {
    const [betAmount, setBetAmount] = useState(0)
    return (
        <div className={player.name} onClick={() => dispatch({ type: 'make-active', player })}>
            <p>{player.name.toUpperCase()} {player.dealer && 'D'} {player.bigBlind && 'BB'} {player.smallBlind && 'SB'}</p>
            <div className="cards">
                {player.hand.map(card => (
                    <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />))
                }
            </div>

            <div className="player-details">
                <p>{JSON.stringify(player.hand)}</p>
                <p>{JSON.stringify(player.stack)}</p>
                {player.active && (
                    <>
                        <button onClick={() => setBetAmount(betAmount + smallBlind)}>Bet +</button>
                        <button onClick={() => {
                            if (betAmount > 0) {
                                setBetAmount(betAmount - smallBlind)
                            }
                        }
                        }>Bet -</button>
                        <form className="buttons" onSubmit={(e) => {
                            e.preventDefault();
                            dispatch({ type: 'submit-bet', betAmount, player });
                            setBetAmount(0)
                            console.log(betAmount, player)
                        }}>
                            <button type='submit'>OK</button>
                        </form>

                        <div>BetAmount: {betAmount}</div>
                        <div> Bet: {player.bet}</div>
                        <div> Stack: {player.stack}</div>
                    </>
                )
                }
            </div>

        </div>
    )
}

export default Player
