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
    return <div className="player-details">
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
            }}>
                {betAmount > 0 && <button type='submit' className='submit'>Bet {betAmount}</button>}
                {<p>{betAmount}</p>}
                {<p>{player.bet}</p>}
            </form>

        </div>
    </div>
}


export default PlayerControls;
