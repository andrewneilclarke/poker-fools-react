export type CardName =
    '2H' | '3H' | '4H' | '5H' | '6H' | '7H' | '8H' | '9H' | '10H' | 'JH' | 'QH' | 'KH' | 'AH' | '2D' | '3D'
    | '4D' | '5D' | '6D' | '7D' | '8D' | '9D' | '10D' | 'JD' | 'QD' | 'KD' | 'AD' | '2C' | '3C' | '4C' |
    '5C' | '6C' | '7C' | '8C' | '9C' | '10C' | 'JC' | 'QC' | 'KC' | 'AC' | '2S' | '3S' | '4S' | '5S'
    | '6S' | '7S' | '8S' | '9S' | '10S' | 'JS' | 'QS' | 'KS' | 'AS' | 'BACK';
export type CardFace = '🂲' | '🂳' | '🂴' | '🂵' | '🂶' | '🂷' | '🂸' | '🂹' | '🂺' | '🂻' | '🂽' | '🂾' | '🂱' | '🃂' | '🃃' | '🃄' | '🃅' | '🃆' | '🃇' | '🃈' | '🃉' | '🃊' | '🃋' | '🃍' | '🃎' | '🃁' | '🃒' |
    '🃓' | '🃔' | '🃕' | '🃖' | '🃗' | '🃘' | '🃙' | '🃚' | '🃛' | '🃝' | '🃞' | '🃑' | '🂢' | '🂣' | '🂤' | '🂥' | '🂦' | '🂧' | '🂨' | '🂩' | '🂪' | '🂫' | '🂭' | '🂮' | '🂡' | '🂠'

export type Hand = CardName[];

export type Deck = CardName[];

export interface PlayerType {
    name: string,
    id: number,
    stack: number,
    hand: CardName[],
    bet: number,
    dealer: boolean,
    active: boolean,
    bigBlind: boolean,
    smallBlind: boolean,
    folded: boolean,
    sittingOut: boolean
    allin: boolean,
    evaluatedHand?: {
        handName: string;
        handRank: number;
        handType: number;
        value: number;
    };
}

export enum Gamestage {
    // 'Waiting',
    Preflop = 0,
    Flop = 1,
    Turn = 2,
    River = 3,
    Showdown = 4
}

export enum PlayerStatus {
    active,
    sittingout,
    vacated,
}


export interface AppState {
    players: PlayerType[]
    pot: number
    rankingResult: RankingResult
}

// interface Game {
//     table: CardName[];
//     players: PlayerType[];
//     pot?: number;
// }


export interface Result {
    cards: string;
    hand: string;
    result: string;
}

export interface RankingResult {
    winners: Array<Result>;
    players: Array<Result>;
}

export type Action =
    | { type: 'submit-bet', betAmount: string, player: PlayerType }
    | { type: 'make-active', player: PlayerType }
    | { type: 'reset-player-cards' }
    | { type: 'clear' }
