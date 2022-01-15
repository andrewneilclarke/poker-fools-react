export type Card =
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
    | 'AS';

export type Hand = Array<Card>;

export type Table = Array<Card>;

export interface Player {
    name: string;
    stack: number;
    bet: number;
    hand: Hand;
    evaluatedHand?: {
        handName: string;
        handRank: number;
        handType: number;
        value: number;
    };
    dealer: boolean;
    active: boolean;
}


interface Game {
    table: Table;
    players: Array<Player>;
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