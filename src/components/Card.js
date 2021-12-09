import '../Card.css'

const Card = ({ card, getCardFace, cardBack, flipped }) => {
    const checkColour = (card) => {
        const cardArr = card.toLowerCase().split('')
        const hasRed = cardArr.filter(item =>
            item === 'h' || item === 'd'
        )
        return hasRed.length > 0
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <p className={checkColour(card) ? "front red" : "front"}> {getCardFace(card)}</p>
                <p className="back" id="cardback">{cardBack}</p>
            </div>
        </div >
    )
}

export default Card
