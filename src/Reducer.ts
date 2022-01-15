export const betReducer = (state, action) => {
    switch (action.type) {
        case 'submit-bet': {
            switch (action.player.name) {
                case 'player4': {
                    return {
                        ...state,
                        player4: { ...state.player4, bet: state.player4.bet + action.betAmount, stack: state.player4.stack - action.betAmount },
                        pot: state.pot + action.betAmount
                    }
                }
                case 'player1': {
                    return {
                        ...state,
                        player1: { ...state.player1, bet: state.player1.bet + action.betAmount, stack: state.player1.stack - action.betAmount },
                        pot: state.pot + action.betAmount
                    }
                }
                case 'player2': {
                    return {
                        ...state,
                        player2: { ...state.player2, bet: state.player2.bet + action.betAmount, stack: state.player2.stack - action.betAmount },
                        pot: state.pot + action.betAmount
                    }
                }
                case 'player3': {
                    return {
                        ...state,
                        player3: { ...state.player3, bet: state.player3.bet + action.betAmount, stack: state.player3.stack - action.betAmount },
                        pot: state.pot + action.betAmount
                    }
                }
                default:
                    break;
            }
            break;
        }


        case 'make-active': {
            if (action.player.name === 'player4') {
                return {
                    ...state,
                    player4: {
                        ...state.player4, active: true
                    },
                    player3: {
                        ...state.player3, active: false
                    },
                    player2: {
                        ...state.player2, active: false
                    },
                    player1: {
                        ...state.player1, active: false
                    },
                }
            }
            if (action.player.name === 'player3') {
                return {
                    ...state,
                    player3: {
                        ...state.player3, active: true
                    },
                    player4: {
                        ...state.player4, active: false
                    },
                    player2: {
                        ...state.player2, active: false
                    },
                    player1: {
                        ...state.player1, active: false
                    },
                }
            }
            if (action.player.name === 'player2') {
                return {
                    ...state,
                    player2: {
                        ...state.player2, active: true
                    },
                    player4: {
                        ...state.player4, active: false
                    },
                    player3: {
                        ...state.player3, active: false
                    },
                    player1: {
                        ...state.player1, active: false
                    },
                }
            }
            if (action.player.name === 'player1') {
                return {
                    ...state,
                    player1: {
                        ...state.player1, active: true
                    },
                    player4: {
                        ...state.player4, active: false
                    },
                    player2: {
                        ...state.player2, active: false
                    },
                    player3: {
                        ...state.player3, active: false
                    },
                }

            }
            break;
        }

        case 'reset-player-cards': {
            return {
                ...state,
                player1: { ...state.player1, cards: [] },
                player2: { ...state.player2, cards: [] },
                player3: { ...state.player3, cards: [] },
                player4: { ...state.player4, cards: [] },
            }
        }

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