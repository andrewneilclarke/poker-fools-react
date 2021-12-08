import '../Card.css'

const Card = ({ card, getCardFace, cardBack }) => {
    return (
        <div className="card">
            <div>
                <p className="front">{getCardFace(card)}</p>
                <p className="back">{cardBack}</p>
            </div>
        </div>
    )
}

export default Card
