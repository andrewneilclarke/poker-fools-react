import { Deck, CardName, CardFace } from "./Interfaces"
import { MyDeck } from "./Deck"

export const shuffle = (deck: Deck): Deck => {
    return [...deck.sort(() => Math.random() - 0.5)]
}

// Card Lookup
export const getCardFace = (card: CardName): CardFace => MyDeck[card] as CardFace