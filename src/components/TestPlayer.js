import { useState, useReducer } from 'react'
import { betReducer } from '../Reducer'

// const initialState = {
//     player1: { cards: [], stack: 300, bet: 0, name: 'player1', dealer: true },
//     player2: { cards: [], stack: 300, bet: 0, name: 'player2', dealer: false },
//     player3: { cards: [], stack: 300, bet: 0, name: 'player3', dealer: false, bigBlind: true },
//     player4: { cards: [], stack: 300, bet: 0, name: 'player4', dealer: false, smallBlind: true, active: true }
// }
const initialState = {
    player1: { cards: [], stack: 300, bet: 0, name: 'player1', dealer: true }
}

const TestPlayer = () => {
    const [betAmount, setBetAmount] = useState(0)
    const [{ player1 }, dispatch] = useReducer(betReducer, initialState)

    return (
        <div>
            <button onClick={
                () => setBetAmount(parseInt(betAmount + 50))}>Bet +</button>
            <form className="buttons" onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: 'submit-bet', player1, betAmount });
                console.log(player1)
                setBetAmount(0)
            }}>
                <button type='submit'>OK</button>
            </form>

            <div>{betAmount}</div>
            <div>{player1.bet}</div>
            <div>{player1.stack}</div>
        </div>
    )
}

export default TestPlayer
