import './App.css';
import { v4 as uuid } from 'uuid';
import { useState, useEffect, useReducer } from 'react';
import { betReducer } from './Reducer';
// Variables
import { MyDeck, cardNames, cardBack } from './Deck'
// Functions
import { shuffle, getCardFace } from './Functions';
// Types
import { CardName, PlayerType, AppState, Gamestage, Deck, CardFace, RankingResult } from './Interfaces'
//Components
import Card from './components/Card';
import Table from './components/Table';
import Gameinfo from './components/Gameinfo';


const initialState: AppState = {
  player1: { hand: [], stack: 300, bet: 0, name: 'andy', dealer: true, bigBlind: false, smallBlind: false, active: false, folded: false, allin: false },
  player2: { hand: [], stack: 300, bet: 0, name: 'rory', dealer: false, bigBlind: false, smallBlind: false, active: true, folded: false, allin: false },
  player3: { hand: [], stack: 300, bet: 0, name: 'fred', dealer: false, bigBlind: true, smallBlind: false, active: false, folded: false, allin: false },
  player4: { hand: [], stack: 300, bet: 0, name: 'carlo', dealer: false, bigBlind: false, smallBlind: true, active: false, folded: false, allin: false },
  pot: 0
}


const App = () => {
  const [{ player1, player2, player3, player4, pot }, dispatch] = useReducer(betReducer, initialState)
  const players: PlayerType[] = [player1, player2, player3, player4]
  const [bigBlind, setBigBlind] = useState<number>(20)
  const [table, setTable] = useState<CardName[]>([])
  const [burnt, setBurnt] = useState<CardName[]>([])
  const [displayDeck, setDisplayDeck] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [currentGameStage, setCurrentGameStage] = useState<string>(Gamestage[1])
  let [liveDeck, setLiveDeck] = useState<Deck>([...cardNames])
  const [flipped, setFlipped] = useState<boolean>(true)
  const [flipTable, setFlipTable] = useState<boolean>(false)
  const [gameResult, setGameResult] = useState<RankingResult>({
    winners: [],
    players: []
  })
  const [myError, setMyError] = useState<string | null>(null)

  // Calculate smallblind
  const smallBlind = bigBlind / 2

  const getDeck = () => Object.keys(MyDeck) as Array<CardFace>;

  useEffect(() => {

    // WHILE ACTIVE PLAYERS > 1
    playGame();
    // FIRST ROUND OF BETS
    // SECOND ROUND OF BETS
    // dealTurn()
    // THIRD ROUND OF BETS
    // dealRiver()
    // FOURTH ROUND OF BETS
    // SHOW DOWN (SHOW CARDS) => FETCH WINNER (& DISPLAY) => PAYOUT POT
    // nextGame()
    // console.log('end')
  }, [])

  const playGame = () => {
    shuffleandSet();
    // create DEAL PLAYERS FUNCTION
    dealFlop();
    // // FIRST ROUND OF BETS
    // setFlipTable(true)
    // dealTurn();
    // dealRiver();
    // getResult();
  }

  const shuffleandSet = () => {
    const shuffed = shuffle(liveDeck)
    setLiveDeck(shuffed)
  }

  const dealFlop = () => {
    setCurrentGameStage(Gamestage[1])
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
    return { liveDeck, player1, player2, player3, player4 }
  }

  const dealTurn = () => {
    setCurrentGameStage(Gamestage[2])
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return { liveDeck, player1, player2, player3, player4, burnt }
  }

  const dealRiver = () => {
    setCurrentGameStage(Gamestage[3])
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
    return { liveDeck, player1, player2, player3, player4, burnt }
  }

  const getResult = async () => {
    const r = await fetchRankingResult()
    console.log(r)
    setGameResult(r)
  }

  const fetchRankingResult = async () => {
    const finaltable = table.join(',')
    let players: PlayerType[] | string = [player1, player2, player3, player4]
    players = players.map((p) => `&pc[]=${p.hand.join(',')}`).join('')
    let url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${finaltable}${players}`;
    try {
      const res = await fetch(url);
      return res.json();
    } catch (error) {
      setMyError(`😖 Oh man! ${error}`);
      console.log("PokerApi error", error);
      throw error
    }
  }

  // const equalHand = (p: Player) => (r: Result) => r.hand === p.hand.join(',');

  const refillDeck = () => {
    liveDeck = [...cardNames]
  }

  const nextGame = () => {
    setTable([])
    setBurnt([])
    setCurrentGameStage(Gamestage[0])
    dispatch({ type: 'reset-player-cards' })
    refillDeck()
  }

  return (
    <div className="App">
      {/* DISPLAY PLAYERS */}
      {/* <p>{JSON.stringify({ player1, player2, player3, player4 })}</p> */}

      <div className='deck-container'>

        {/* DISPLAY DECK */}
        {/* <button onClick={() => setDisplayDeck(!displayDeck)}>{displayDeck ? 'Hide Deck' : 'Display Deck (Admin)'}</button> */}
        {displayDeck && liveDeck.map(card =>
        (<div id="deck" key={uuid()}>
          <Card key={card} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
        </div>)
        )}
        {displayDeck &&
          <div className="burnt">
            <p id="burnt">Burnt: </p>
            <div className="burnt-cont">
              {burnt.map(card =>
              (<div id="deck" key={uuid()}>
                <Card key={uuid()} card={card} getCardFace={getCardFace} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} />
              </div>))}
            </div>
          </div>
        }
      </div>

      {/* CONTROL BUTTONS */}
      <div className="buttons">
        {currentGameStage === Gamestage[0] && <button onClick={shuffleandSet}>Shuffle</button>}
        <div className="stage-change">
          {currentGameStage === Gamestage[0] && <button onClick={() => dealFlop()}>Deal Flop</button>}
          {currentGameStage === Gamestage[1] && <button onClick={() => dealTurn()}>Deal Turn</button>}
          {currentGameStage === Gamestage[2] && <button onClick={() => dealRiver()}>Deal River</button>}
        </div>
        <button onClick={getResult}>Get result</button>
        <button onClick={nextGame}>Clear Table / Next Game</button>

      </div>

      {/* DISPLAY TABLE / PLAYERS */}

      <Table table={table} currentGameStage={currentGameStage} dispatch={dispatch} gameResult={gameResult} players={players} pot={pot} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} getCardFace={getCardFace} gameOver={gameOver} bigBlind={bigBlind} smallBlind={smallBlind} flipTable={flipTable} />

      {/* GAME INFO / STATS DISPLAY */}
      <Gameinfo bigBlind={bigBlind} currentGameStage={currentGameStage} pot={pot} smallBlind={smallBlind} gameResult={gameResult} players={players} myError={myError} />
    </div>

  );
}

export default App;
