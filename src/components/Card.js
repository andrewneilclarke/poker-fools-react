import '../Card.css'

const Card = ({ card, getCardFace, cardBack, flipped, setFlipped }) => {

    const checkColour = (card) => {

        const cardArr = card.toLowerCase().split('')
        const hasRed = cardArr.filter(item =>
            item === 'h' || item === 'd'
        )
        return hasRed.length > 0
    }

    const flipCard = (card) => {
        console.log(card)
        setFlipped(!flipped)
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                {flipped ? <p className={checkColour(card) ? "front red" : "front"} onClick={() => flipCard(card)}> {getCardFace(card)}</p> :
                    // <p className="back" id="cardback">{cardBack}</p>
                    <p className='cardback' onClick={() => flipCard(card)}>{cardBack}</p>
                }

            </div>
        </div >
    )
}

export default Card
