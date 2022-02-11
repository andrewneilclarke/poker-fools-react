import { AppState } from './Interfaces'


export const betReducer = (state: AppState, action: any) => {
    switch (action.type) {
        case 'submit-bet': {
            return {
                ...state,
                players: state.players.map(p => p.name === action.player.name ? { ...p, bet: p.bet + action.betAmount, stack: p.stack - action.betAmount } : { ...p }),
                pot: state.pot + action.betAmount
            }
        }

        case 'make-active': {
            return {
                ...state,
                players: state.players.map(p => p.name === action.player.name && !p.folded ? { ...p, active: true } : { ...p, active: false })
            }
        }
        case 'make-next-active': {
            return {
                ...state,
                players: state.players.map(p => p.id === action.nextActiveID && !p.folded ? { ...p, active: true } : { ...p, active: false })
            }
        }
        case 'fold': {
            return {
                ...state,
                players: state.players.map(p => p.name === action.player.name ? { ...p, active: false, folded: true, bet: 0 } : { ...p }),
            }
        }
        case 'check': {
            return {
                ...state,
                players: state.players.map(p => p.name === action.player.name ? { ...p, active: false, folded: true, bet: 0 } : { ...p }),
            }
        }
        case 'set-dealer': {
            return {
                ...state,
                players: state.players.map(p => p.id === action.newDealerID ? { ...p, dealer: true } : { ...p, dealer: false }),
            }
        }
        case 'set-bb': {
            return {
                ...state,
                players: state.players.map(p => p.id === action.newBBID ? { ...p, bigBlind: true } : { ...p, bigBlind: false })
            }
        }
        case 'pay-bb': {
            // console.log(action.BB[0].name, state.players[2])
            return {
                ...state,
                players: state.players.map(p => p.name === action.BB[0].name ? { ...p, bet: action.bigBlind, stack: p.stack - action.bigBlind } : { ...p }),
                pot: state.pot + action.bigBlind
            }
        }
        case 'set-sb': {
            return {
                ...state,
                players: state.players.map(p => p.id === action.newSBID ? { ...p, smallBlind: true } : { ...p, smallBlind: false })
            }
        }
        case 'pay-sb': {
            return {
                ...state,
                players: state.players.map(p => p.name === action.SB[0].name ? { ...p, bet: action.smallBlind, stack: p.stack - action.smallBlind } : { ...p }),
                pot: state.pot + action.smallBlind
            }
        }

        case 'call': {
            return {
                ...state,
                players: state.players.map(p => p.name === action.player.name ? { ...p, bet: action.bigBlind, stack: p.stack - action.bigBlind } : { ...p }),
                pot: state.pot + action.bigBlind
            }
        }

        case 'reset-player-cards': {
            return {
                ...state,
                players: state.players.map(p => p.hand && { ...p, hand: [] })

            }
        }
        case 'payout': {
            return {
                ...state,
                //     players: state.players.map(p => getWinnerName(action.gameResult, action.players) === (p.name) ? { ...p, stack: p.stack + state.pot } : { ...p }),
                //     pot: 0,
            };
        }

        default:
            break;
    }

    throw Error("No Action provided")
}