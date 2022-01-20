export type CardType =
    '2H'
    | '3H'
    | '4H'
    | '5H'
    | '6H'
    | '7H'
    | '8H'
    | '9H'
    | '10H'
    | 'JH'
    | 'QH'
    | 'KH'
    | 'AH'
    | '2D'
    | '3D'
    | '4D'
    | '5D'
    | '6D'
    | '7D'
    | '8D'
    | '9D'
    | '10D'
    | 'JD'
    | 'QD'
    | 'KD'
    | 'AD'
    | '2C'
    | '3C'
    | '4C'
    | '5C'
    | '6C'
    | '7C'
    | '8C'
    | '9C'
    | '10C'
    | 'JC'
    | 'QC'
    | 'KC'
    | 'AC'
    | '2S'
    | '3S'
    | '4S'
    | '5S'
    | '6S'
    | '7S'
    | '8S'
    | '9S'
    | '10S'
    | 'JS'
    | 'QS'
    | 'KS'
    | 'AS'
    | 'BACK';

export type Hand = Array<CardType>;

export type Table = Array<CardType>;

// export interface Player {
//     name: string;
//     stack: number;
//     bet: number;
//     hand: Hand;
//     evaluatedHand?: {
//         handName: string;
//         handRank: number;
//         handType: number;
//         value: number;
//     };
//     dealer: boolean;
//     active: boolean;
// }

export interface PlayerType {
    hand: string[],
    stack: number,
    bet: number,
    name: string,
    dealer: boolean,
    active: boolean,
    bigBlind: boolean,
    smallBlind: boolean
}

export interface AppState {
    player1: PlayerType,
    player2: PlayerType,
    player3: PlayerType,
    player4: PlayerType,
    pot: number
}

interface Game {
    table: Table;
    players: Array<PlayerType>;
    pot?: number;
}


interface Result {
    cards: string;
    hand: string;
    result: string;
}

interface RankingResult {
    winners: Array<Result>;
    players: Array<Result>;
}