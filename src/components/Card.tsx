import '../Card.css'
import { useState } from 'react'

const Card = (card: string, getCardFace: any, cardBack: any, flipped: boolean, setFlipped: any) => {
    const [isFlipped, setIsFlipped] = useState(flipped)

    // helper funtion to check card colour
    const checkColour = (card: string) => {
        const cardArr = card.toLowerCase().split('')
        const hasRed = cardArr.filter(item =>
            item === 'h' || item === 'd'
        )
        return hasRed.length > 0
    }

    const flipCard = (card: string) => {
        setIsFlipped(!isFlipped)
    }
    // const flipCard = (card) => {
    //     // console.log(card)
    //     setFlipped(!flipped)
    // }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                {isFlipped ?
                    <p className={checkColour(card) ? "front red" : "front"} onClick={() => flipCard(card)}> {getCardFace(card)}</p> :
                    <p className='cardback' onClick={() => flipCard(card)}>{cardBack}</p>
                }

            </div>
        </div >
    )
}

export default Card
