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

    const foldPlayer = () => {
        dispatch({ type: 'fold', player })
        // dispatch({ type: 'remove-folded-player', player })
        // makeNextActive(player.id)
    }

    const getNextActive = (id: number) => {
        let nextActiveID: number;
        if (id < 4) {
            nextActiveID = id + 1
        } else if (id === 4) {
            nextActiveID = 1
        }
        return nextActiveID
    }

    return <div className="player-details">
        <div className="player-buttons">
            {/* CHECK */}
            {player.bet === betAmount && player.bet !== 0 && <button onClick={() => dispatch({ type: 'check', player, betAmount })}>Check</button>}
            {/* FOLD */}
            <button onClick={foldPlayer}>Fold</button>
            {/* CALL */}
            {player.bet < bigBlind && <button onClick={() => dispatch({ type: 'call', betAmount, player, bigBlind })}>Call {bigBlind}</button>}
            {/* RAISE */}
            <button onClick={() => setBetAmount((prev) => betAmount + smallBlind)}>Raise {smallBlind}</button>
            {/* REDUCE BET AMOUNT */}
            <button onClick={reduceBet}>-</button>
            {/* SUBMIT (FINAL) */}
            {betAmount > 0 && <button onClick={() => {
                let nextID = getNextActive(player.id)
                dispatch({ type: 'submit-bet', betAmount, player });
                dispatch({ type: 'make-next-active', nextID, player })
                setBetAmount(0)
                console.log('nextID', nextID)
            }}>
                OK {betAmount}</button>}
            {/* {betAmount > 0 && <button type='submit' className='submit'>OK {betAmount}</button>} */}


        </div>
    </div>
}


export default PlayerControls;
