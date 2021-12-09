import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Deck from './Deck'

const cardNames = Object.keys(Deck).slice(0, 52)
// const cardFaces = Object.values(Deck).slice(0, 52)
const cardBack = Object.values(Deck)[52]

function App() {
  const [cards, setCards] = useState([])
  const [player1, setPlayer1] = useState({ cards: [], stack: 300, name: 'player1', dealer: true })
  const [player2, setPlayer2] = useState({ cards: [], stack: 300, name: 'player2', dealer: false })
  const [table, setTable] = useState([])
  const [gameOver, setGameOver] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardNames].sort(() => Math.random() - 0.5);
    setCards(shuffledCards)
  }



  useEffect(() => {
    shuffleCards()
    // dealFlop(table, player1, player2)
  }, [])

  const getCardFace = (card) => Deck[card]

  const dealFlop = (table, player1, player2) => {
    player1.cards.push(cards.pop())
    player2.cards.push(cards.pop())
    player1.cards.push(cards.pop())
    player2.cards.push(cards.pop())
    table.push(cards.pop())
    table.push(cards.pop())
    table.push(cards.pop())
    setGameOver(false)
    console.log('cards: ', cards, 'table: ', table, 'player1 cards: ', player1.cards)
    return table, player1, player2, cards
  }

  return (
    <div className="App">
      <h3>Poker Fools</h3>
      <button onClick={() => dealFlop(table, player1, player2)}>New Game</button>
      <div className="table">
        {!gameOver && table.map(card => (
          <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} />
        ))}
      </div>
      <div className="players">
        <div className="player">
          {player1.cards.map(card => (
            <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={false} />))
          }
          {player1.dealer && <p>D</p>}

        </div>
        <div className="player">
          {player2.cards.map(card => (
            <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={false} />
          ))
          }
          {player2.dealer && <p>D</p>}
        </div>

      </div>
      <div>
        {JSON.stringify(player1)}

      </div>
      <div>
        {JSON.stringify(player2)}
      </div>
    </div>
  );
}

export default App;
