export const betReducer = (state, action) => {
    switch (action.type) {
        case 'increment': {
            return {
                ...state,
                bet: 50,
            }
        }
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