export const betReducer = (state, action) => {
    switch (action.type) {
        case 'submit-bet':
            console.log(action.betAmount, action.player.name)
            if (action.player.name === 'player4') {
            }
            return {
                // player1: { ...state.player1, bet: state.player1.bet + action.betAmount, stack: state.player1.stack - action.betAmount }
                ...state,
                player4: { ...state.player4, bet: state.player4.bet + action.betAmount, stack: state.player4.stack - action.betAmount }
            }
            if (action.player.name === 'player3') {
            }
            return {
                // player1: { ...state.player1, bet: state.player1.bet + action.betAmount, stack: state.player1.stack - action.betAmount }
                ...state,
                player3: { ...state.player3, bet: state.player3.bet + action.betAmount, stack: state.player3.stack - action.betAmount }
            }
            if (action.player.name === 'player2') {
            }
            return {
                // player1: { ...state.player1, bet: state.player1.bet + action.betAmount, stack: state.player1.stack - action.betAmount }
                ...state,
                player2: { ...state.player2, bet: state.player2.bet + action.betAmount, stack: state.player2.stack - action.betAmount }
            }
            if (action.player.name === 'player1') {
            }
            return {
                // player1: { ...state.player1, bet: state.player1.bet + action.betAmount, stack: state.player1.stack - action.betAmount }
                ...state,
                player1: { ...state.player1, bet: state.player1.bet + action.betAmount, stack: state.player1.stack - action.betAmount }
            }
        // ...action.player,
        // bet: action.betAmount,
        // case 'decrement': {
        //     return {
        //         ...state,
        //         bet: player.bet - 50,
        //     };
        // }
        // case 'all-in': {
        //     return {
        //         ...state,
        //         bet: player.stack,
        //     };
        // }
        case 'clear': {
            return {
                ...state,
                bet: 0,
            };
        }

        default:
            break;
    }
    return state
}