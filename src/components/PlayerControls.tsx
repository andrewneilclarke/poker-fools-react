import React, { useState } from 'react';
import { PlayerType } from '../Interfaces'


interface Props {
    player: PlayerType,
    players: PlayerType[]
    setFlipped: any,
    dispatch: React.Dispatch<any>,
    smallBlind: number,
    bigBlind: number,
}

const PlayerControls: React.FC<Props> = ({ bigBlind, dispatch, player, players, setFlipped, smallBlind }) => {
    const [betAmount, setBetAmount] = useState(0)
    const reduceBet = () => {
        if (betAmount > smallBlind) {
            setBetAmount(betAmount - smallBlind)
        }
    }
    return <div className="player-details">
        <div className="player-buttons">
            {/* CHECK */}
            {player.bet === betAmount && player.bet !== 0 && <button onClick={() => dispatch({ type: 'check', player, betAmount })}>Check</button>}
            {/* FOLD */}
            <button onClick={() => dispatch({ type: 'fold', player, betAmount })}>Fold</button>
            {/* CALL */}
            {player.bet < bigBlind && <button onClick={() => dispatch({ type: 'call', betAmount, player, bigBlind })}>Call {bigBlind}</button>}
            {/* RAISE */}
            <button onClick={() => setBetAmount((prev) => prev + smallBlind)}>Raise {smallBlind}</button>

            <button onClick={reduceBet}>-</button>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: 'submit-bet', betAmount, player });
                setBetAmount(0)
            }}>
                {betAmount > 0 && <button type='submit' className='submit'>OK {betAmount}</button>}
                {/* {<p>{betAmount}</p>} */}
                {<p>{player.bet}</p>}
            </form>

        </div>
    </div>
}


export default PlayerControls;
