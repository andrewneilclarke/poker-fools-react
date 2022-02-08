import { AppState, Action } from './Interfaces'

export const betReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'submit-bet': {
            switch (action.player.name) {
                case 'carlo': {
                    return {
                        ...state,
                        player4: { ...state.player4, bet: state.player4.bet + action.betAmount, stack: state.player4.stack - action.betAmount },
                        pot: state.pot + action.betAmount
                    }
                }
                case 'andy': {
                    return {
                        ...state,
                        player1: { ...state.player1, bet: state.player1.bet + action.betAmount, stack: state.player1.stack - action.betAmount },
                        pot: state.pot + action.betAmount
                    }
                }
                case 'rory': {
                    return {
                        ...state,
                        player2: { ...state.player2, bet: state.player2.bet + action.betAmount, stack: state.player2.stack - action.betAmount },
                        pot: state.pot + action.betAmount
                    }
                }
                case 'fred': {
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
            // console.log(state.players.map(p => p.name === action.player.name))
            console.log(action.player.name)
            // console.log(state.players.map(player => {
            //     if (player.name === action.player.name) {
            //         return { ...player, active: true }
            //     }
            // }))


            // const selectedPlayerArr = Object.entries(state).filter(arr => arr[1].name === action.player.name)
            // const selectedPlayerObj = selectedPlayerArr[0]
            // const selectedPlayerName = selectedPlayerObj[0]
            // const sName = action.player.name
            // console.log(selectedPlayerObj)


            return {
                ...state,
                players: state.players.map((p, name) => p.name === action.player.name ? { ...p, active: true } : { ...p, active: false })
                // .map((p, name) => name !== action.player.name ? { ...p, active: false } : p)

                // state.players.map(p => p.name === action.player.name ? p.active : true)
                // .map(p => p.name !== action.player.name ? p.active : false)
                // state.players.map(p => p.name === action.player.name:
                // players: ...players.map(p => p.name === action.player.name, active: true )

                // player4: {
                //     ...state.player4, active: false
                // },
                // player3: {
                //     ...state.player3, active: false
                // },
                // player2: {
                //     ...state.player2, active: false
                // },
                // player1: {
                //     ...state.player1, active: false
                // },
            }
        }

        // if (action.player.name === 'carlo') {
        //     return {
        //         ...state,
        //         player4: {
        //             ...state.player4, active: true
        //         },
        //         player3: {
        //             ...state.player3, active: false
        //         },
        //         player2: {
        //             ...state.player2, active: false
        //         },
        //         player1: {
        //             ...state.player1, active: false
        //         },
        //     }
        // }
        // if (action.player.name === 'fred') {
        //     return {
        //         ...state,
        //         player3: {
        //             ...state.player3, active: true
        //         },
        //         player4: {
        //             ...state.player4, active: false
        //         },
        //         player2: {
        //             ...state.player2, active: false
        //         },
        //         player1: {
        //             ...state.player1, active: false
        //         },
        //     }
        // }
        // if (action.player.name === 'rory') {
        //     return {
        //         ...state,
        //         player2: {
        //             ...state.player2, active: true
        //         },
        //         player4: {
        //             ...state.player4, active: false
        //         },
        //         player3: {
        //             ...state.player3, active: false
        //         },
        //         player1: {
        //             ...state.player1, active: false
        //         },
        //     }
        // }
        // if (action.player.name === 'andy') {
        //     return {
        //         ...state,
        //         player1: {
        //             ...state.player1, active: true
        //         },
        //         player4: {
        //             ...state.player4, active: false
        //         },
        //         player2: {
        //             ...state.player2, active: false
        //         },
        //         player3: {
        //             ...state.player3, active: false
        //         },
        //     }

        // }
        // break;
        // }

        case 'reset-player-cards': {
            return {
                ...state,
                player1: { ...state.player1, hand: [] },
                player2: { ...state.player2, hand: [] },
                player3: { ...state.player3, hand: [] },
                player4: { ...state.player4, hand: [] },
            }
        }
        case 'call': {
            console.log('call')
            switch (action.player.name) {
                case 'carlo': {
                    return {
                        ...state,
                        player4: { ...state.player4, bet: action.bigBlind, stack: state.player4.stack - action.bigBlind },
                        pot: state.pot + action.bigBlind
                    }
                }
                case 'andy': {
                    return {
                        ...state,
                        player1: { ...state.player1, bet: action.bigBlind, stack: state.player1.stack - action.bigBlind },
                        pot: state.pot + action.bigBlind
                    }
                }
                case 'rory': {
                    console.log(action.betAmount, action.player, action.bigBlind)
                    return {
                        ...state,
                        player2: { ...state.player2, bet: action.bigBlind, stack: state.player2.stack - action.bigBlind },
                        pot: state.pot + action.bigBlind
                    }
                }
                case 'fred': {
                    return {
                        ...state,
                        player3: { ...state.player3, bet: action.bigBlind, stack: state.player3.stack - action.bigBlind },
                        pot: state.pot + action.bigBlind
                    }
                }
                default:
                    break;
            }
            break;
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

    throw Error("No Action provided")
}