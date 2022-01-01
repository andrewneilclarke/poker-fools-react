import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import { Deck, shuffle } from './Deck'

const cardNames = Object.keys(Deck).slice(0, 52)
const cardFaces = Object.values(Deck).slice(0, 52)
const cardBack = Object.values(Deck)[52]
let liveDeck = [...cardNames]

function App() {
  const [cards, setCards] = useState([])
  const [player1, setPlayer1] = useState({ cards: [], stack: 300, name: 'player1', dealer: true })
  const [player2, setPlayer2] = useState({ cards: [], stack: 300, name: 'player2', dealer: false })
  const [table, setTable] = useState([])
  const [burnt, setBurnt] = useState([])
  const [gameOver, setGameOver] = useState(null)
  let [liveDeck, setLiveDeck] = useState([...cardNames])
  const [flipped, setFlipped] = useState(true)
  const [gameResult, setGameResult] = useState({
    winners: [],
    players: [],
  });

  const getCardFace = (card) => Deck[card]

  useEffect(() => {
    // shuffle(liveDeck);
    // console.log('live deck: ', liveDeck)
    // shuffleCards()
    // dealFlop(table, player1, player2)
  }, [])

  const shuffleandSet = () => {
    const shuffed = shuffle(liveDeck)
    setLiveDeck(shuffed)
    console.log(liveDeck)
  }

  const dealFlop = (deck, table, player1, player2) => {
    player1.cards.push(liveDeck.pop())
    player2.cards.push(liveDeck.pop())
    player1.cards.push(liveDeck.pop())
    player2.cards.push(liveDeck.pop())
    table.push(liveDeck.pop())
    table.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return liveDeck, player1, player2
  }

  const dealTurn = (deck, table, burnt, player1, player2) => {
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return liveDeck, player1, player2, burnt
  }

  const dealRiver = (deck, table, burnt, player1, player2) => {
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return liveDeck, player1, player2, burnt
  }

  const getResult = async () => {
    const r = await fetchRankingResult
    setGameResult(r)
  }

  const fetchRankingResult = async () => {
    const finaltable = table.join(',')
    // console.log(table)
    let players = [player1, player2]
    players = [players.map((p) => `&pc[]=${p.cards.join(',')}`).join('')]
    console.log('table: ', table, 'players', players)

    // const table = game.table.join(',');

    // table:  9H,3S,2D,8C,2C players:  &pc[]=QS,QH&pc[]=7D,7H&pc[]=JD,AH
    // const players = game.players.map((p) => `&pc[]=${p.hand.join(',')}`).join('');
    let url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${finaltable}${players}`;
    // let url =
    //   'https://api.pokerapi.dev/v1/winner/texas_holdem?cc=AC,KD,QH,JS,7C&pc[]=10S,8C&pc[]=3S,2C&pc[]=QS,JH';
    const res = await fetch(url);
    // console.log(res.json())
    return res.json();
  };

  // const equalHand = (p: Player) => (r: Result) => r.cards === p.hand.join(',');

  return (
    <div className="App">
      <div className='deck-container'>
        {liveDeck.map(card =>
        (<div id="deck">
          <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
        </div>)
        )}
        <div className="burnt">
          <p id="burnt">Burnt: </p>
          <div className="burnt-cont">
            {burnt.map(card =>
            (<div id="deck">
              <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
            </div>))}
          </div>
        </div>
      </div>

      <h3>Poker Fools</h3>
      <div className="buttons">
        <button onClick={shuffleandSet}>Shuffle</button>
        <button onClick={() => dealFlop(liveDeck, table, player1, player2)}>Deal Flop</button>
        <button onClick={() => dealTurn(liveDeck, table, burnt, player1, player2)}>Deal Turn</button>
        <button onClick={() => dealRiver(liveDeck, table, burnt, player1, player2)}>Deal River</button>
        <button onClick={fetchRankingResult}>Result</button>
      </div>
      <div className="table-and-players">
        <div className="table">
          {!gameOver && table.map(card => (
            <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
          ))}
        </div>
        <div className="players">
          <div className="player1">
            <p>{player1.name.toUpperCase()} {player1.dealer && player1.cards.length === 2 && 'D'} </p>

            <div className="cards">
              {player1.cards.map(card => (
                <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />))
              }
            </div>

            <div className="player-details">
              <p>{JSON.stringify(player1.cards)}</p>
              <p>{JSON.stringify(player1.stack)}</p>
            </div>
          </div>
          <div className="player2">
            <p>{player2.name.toUpperCase()} {player2.dealer && player2.cards.length === 2 && 'D'} </p>
            <div className="cards">
              {player2.cards.map(card => (
                <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
              ))
              }

            </div>
            {player2.dealer && player2.cards.length === 2 && <p>D</p>}
            <div className="player-details">
              <p>{JSON.stringify(player2.cards)}</p>
              <p>{JSON.stringify(player2.stack)}</p>
            </div>
            {gameResult && <p>{JSON.stringify(gameResult)}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
