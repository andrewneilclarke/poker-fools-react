import { Deck, CardName, CardFace, RankingResult, PlayerType } from "./Interfaces"
import { MyDeck } from "./Deck"

export const shuffle = (deck: Deck): Deck => {
    return [...deck.sort(() => Math.random() - 0.5)]
}

export const getWinnerName = (gameResult: RankingResult, players: PlayerType[]): string[] | string => {
    const resultCards = gameResult.winners[0].cards;
    const winningPlayersArr = players.filter(player => player.hand.join(',') === resultCards)
    const namesArr = (winningPlayersArr.map(player => player.name))
    if (namesArr.length > 1) {
        console.log(namesArr)
        // return namesArr
        // let string = ``
        // namesArr.forEach(name => console.log('winner: ', name))
        // return string
    }
    if (namesArr[0]) {
        return namesArr[0].charAt(0).toUpperCase() + namesArr[0].slice(1);
    }
}

// || 'straight' || 'flush' || 'full_house'
export const formatWinnerHand = (str: string) => {
    let formattedStr = str.toLowerCase()
    if (formattedStr === 'pair' || formattedStr === 'straight' || formattedStr === 'flush' || formattedStr === 'full_house' || formattedStr === 'high_card') {
        formattedStr = `a ${formattedStr.replaceAll('_', ' ')}`
    }
    else {
        formattedStr = `${str.toLowerCase().replaceAll('_', ' ')}`
    }
    return formattedStr
}


// Card Lookup
export const getCardFace = (card: CardName): CardFace => MyDeck[card] as CardFace