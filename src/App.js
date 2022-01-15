import { useState, useEffect, useReducer } from 'react';
import { betReducer } from './Reducer';
import './App.css';
import Card from './components/Card';
import Player from './components/Player';
import { Deck, shuffle } from './Deck'
import { gameStage } from './GameStages';

const cardNames = Object.keys(Deck).slice(0, 52)
const cardFaces = Object.values(Deck).slice(0, 52)
const cardBack = Object.values(Deck)[52]
let liveDeck = [...cardNames]

const initialState = {
  player1: { hand: [], stack: 300, bet: 0, name: 'player1', dealer: true, active: false },
  player2: { hand: [], stack: 300, bet: 0, name: 'player2', dealer: false, active: false },
  player3: { hand: [], stack: 300, bet: 0, name: 'player3', dealer: false, bigBlind: true, active: false },
  player4: { hand: [], stack: 300, bet: 0, name: 'player4', dealer: false, smallBlind: true, active: true },
  pot: 0
}

function App() {
  const [{ player1, player2, player3, player4, pot }, dispatch] = useReducer(betReducer, initialState)
  const players = [player1, player2, player3, player4]
  const [bigBlind, setBigBlind] = useState(20)
  const [table, setTable] = useState([])
  const [burnt, setBurnt] = useState([])
  // const [pot, setPot] = useState(0)
  const [displayDeck, setDisplayDeck] = useState(false)
  const [gameOver, setGameOver] = useState(null)
  const [currentGameStage, setCurrentGameStage] = useState(gameStage[0])
  let [liveDeck, setLiveDeck] = useState([...cardNames])
  const [flipped, setFlipped] = useState(false)
  const [gameResult, setGameResult] = useState({
    winners: [],
    players: [],
  });
  const smallBlind = bigBlind / 2

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
  }

  const dealFlop = (deck, table, player1, player2) => {
    setCurrentGameStage(gameStage[1])
    player1.hand.push(liveDeck.pop())
    player2.hand.push(liveDeck.pop())
    player3.hand.push(liveDeck.pop())
    player4.hand.push(liveDeck.pop())
    player1.hand.push(liveDeck.pop())
    player2.hand.push(liveDeck.pop())
    player3.hand.push(liveDeck.pop())
    player4.hand.push(liveDeck.pop())
    table.push(liveDeck.pop())
    table.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return liveDeck, player1, player2, player3, player4
  }

  const dealTurn = (deck, table, burnt, player1, player2) => {
    setCurrentGameStage(gameStage[2])
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return liveDeck, player1, player2, player3, player4, burnt
  }

  const dealRiver = (deck, table, burnt, player1, player2) => {
    setCurrentGameStage(gameStage[3])
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return liveDeck, player1, player2, player3, player4, burnt
  }

  const getResult = async () => {
    // const r = await fetchRankingResult
    // setGameResult(r)
  }

  const fetchRankingResult = async () => {
    // TO IMPLEMENT
    // const finaltable = table.join(',')
    // console.log(table)
    // let players = [player1, player2, player3, player4]
    // players = [players.map((p) => `&pc[]=${p.hand.join(',')}`).join('')]
    // console.log('table: ', table, 'players', players)

    // const table = game.table.join(',');

    // table:  9H,3S,2D,8C,2C players:  &pc[]=QS,QH&pc[]=7D,7H&pc[]=JD,AH
    // const players = game.players.map((p) => `&pc[]=${p.hand.join(',')}`).join('');

    // let url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${finaltable}${players}`;
    // let url =
    //   'https://api.pokerapi.dev/v1/winner/texas_holdem?cc=AC,KD,QH,JS,7C&pc[]=10S,8C&pc[]=3S,2C&pc[]=QS,JH';
    // const res = await fetch(url);
    // console.log(res.json())
    // return res.json();
  };

  // const equalHand = (p: Player) => (r: Result) => r.hand === p.hand.join(',');

  const nextGame = () => {
    setTable([])
    setBurnt([])
    setCurrentGameStage(gameStage[0])
    dispatch({ type: 'reset-player-cards' })
    setLiveDeck([...cardNames])
    // shuffleandSet()
  }

  return (
    <div className="App">
      {/* DISPLAY PLAYERS */}
      {/* <p>{JSON.stringify({ player1, player2, player3, player4 })}</p> */}

      <div className='deck-container'>

        {/* DISPLAY DECK */}
        <button onClick={() => setDisplayDeck(!displayDeck)}>Display Deck</button>
        {displayDeck && liveDeck.map(card =>
        (<div id="deck">
          <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
        </div>)
        )}
        {displayDeck &&
          <div className="burnt">
            <p id="burnt">Burnt: </p>
            <div className="burnt-cont">
              {burnt.map(card =>
              (<div id="deck" key={card}>
                <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
              </div>))}
            </div>
          </div>
        }
      </div>

      {/* CONTROL BUTTONS */}
      <div className="buttons">
        {currentGameStage === gameStage[0] && <button onClick={shuffleandSet}>Shuffle</button>}
        <div className="stage-change">
          {currentGameStage === gameStage[0] && <button onClick={() => dealFlop(liveDeck, table, player1, player2)}>Deal Flop</button>}
          {currentGameStage === gameStage[1] && <button onClick={() => dealTurn(liveDeck, table, burnt, player1, player2)}>Deal Turn</button>}
          {currentGameStage === gameStage[2] && <button onClick={() => dealRiver(liveDeck, table, burnt, player1, player2)}>Deal River</button>}
        </div>
        <button onClick={nextGame}>Next Game / Reset Cards</button>
        {/* <button onClick={fetchRankingResult}>Result</button> */}
      </div>

      {/* DISPLAY TABLE AND PLAYERS */}
      <div className="table-and-players">
        <div className="game-info">
          {currentGameStage}
          <p>Blinds: {`${bigBlind} / ${smallBlind}`}</p>
        </div>
        <div className="table">
          {!gameOver && table.map(card => (
            <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
          ))}
          <p>Poker Fools</p>
        </div>

        <div className="players">
          {players.map(player => (
            <Player key={player.name} player={player} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} smallBlind={smallBlind} dispatch={dispatch} />

          ))}
        </div>
      </div>

      <p className="pot">Pot: {pot}</p>
      {gameResult && <p>{JSON.stringify(gameResult)}</p>}
    </div>

  );
}

export default App;
