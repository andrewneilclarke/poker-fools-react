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
  players: [
    { hand: [], stack: 300, id: 1, bet: 0, name: 'andy', dealer: true, bigBlind: false, smallBlind: false, active: false, folded: false, allin: false, sittingOut: false },
    { hand: [], stack: 300, id: 2, bet: 0, name: 'rory', dealer: false, bigBlind: false, smallBlind: true, active: false, folded: false, allin: false, sittingOut: false },
    { hand: [], stack: 300, id: 3, bet: 0, name: 'fred', dealer: false, bigBlind: true, smallBlind: false, active: false, folded: false, allin: false, sittingOut: false },
    { hand: [], stack: 300, id: 4, bet: 0, name: 'carlo', dealer: false, bigBlind: false, smallBlind: false, active: true, folded: false, allin: false, sittingOut: false },
  ],
  pot: 0,
  rankingResult: {
    winners: [],
    players: []
  }
}

const App = () => {
  const [state, dispatch] = useReducer(betReducer, initialState)
  const players: PlayerType[] = state.players
  const [bigBlind, setBigBlind] = useState<number>(20)
  const [table, setTable] = useState<CardName[]>([])
  const [burnt, setBurnt] = useState<CardName[]>([])
  const [displayDeck, setDisplayDeck] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [currentGameStage, setCurrentGameStage] = useState<string>(Gamestage[1])
  let [liveDeck, setLiveDeck] = useState<Deck>([...cardNames])
  const [flipped, setFlipped] = useState<boolean>(true)
  const [flipTable, setFlipTable] = useState<boolean>(true)
  const [dealerID, setDealerID] = useState(1)
  const [myError, setMyError] = useState<string | null>(null)

  // Calculate smallblind
  const smallBlind = bigBlind / 2

  // const getDeck = () => Object.keys(MyDeck) as Array<CardFace>;

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

    // console.log('end')
  }, [])

  const payBlinds = (players: PlayerType[]) => {
    const SB = players.filter(p => p.smallBlind)
    const BB = players.filter(p => p.bigBlind)
    dispatch({ type: 'pay-sb', SB, smallBlind })
    dispatch({ type: 'pay-bb', BB, bigBlind })
  }

  const rotateDealer = () => {
    let newDealerID: number;
    const currentDealer = players.filter(p => p.dealer)
    const currentPlayers: PlayerType[] = players.filter(p => !p.folded)
    // console.log(currentDealer[0].id)
    if (currentDealer[0].id > 0 && currentDealer[0].id < 4) {
      newDealerID = currentDealer[0].id + 1
    } else if (currentDealer[0].id === 4) {
      newDealerID = 1
    }
    // console.log(newDealerID)
    dispatch({ type: 'set-dealer', newDealerID, currentPlayers })
  }

  const rotateBB = () => {
    let newBBID: number;
    const currentBB = players.filter(p => p.bigBlind)
    const currentPlayers: PlayerType[] = players.filter(p => !p.folded)
    if (currentBB[0].id > 0 && currentBB[0].id < 4) {
      newBBID = currentBB[0].id + 1
    } else if (currentBB[0].id === 4) {
      newBBID = 1
    }
    dispatch({ type: 'set-bb', newBBID, currentPlayers })
  }
  const rotateSB = () => {
    let newSBID: number;
    const currentSB = players.filter(p => p.smallBlind)
    const currentPlayers: PlayerType[] = players.filter(p => !p.folded)
    if (currentSB[0].id > 0 && currentSB[0].id < 4) {
      newSBID = currentSB[0].id + 1
    } else if (currentSB[0].id === 4) {
      newSBID = 1
    }
    dispatch({ type: 'set-sb', newSBID, currentPlayers })
  }

  const rotatePlayers = () => {
    rotateDealer()
    rotateSB()
    rotateBB()
  }

  // p.dealer ? p.id )
  // console.log(currentDealer)
  // if (dealerID === 1) {
  //   dispatch({ type: 'set-dealer', dealerID })
  //   dispatch({ type: 'set-sb', dealerID })
  //   dispatch({ type: 'set-bb', dealerID })
  // }


  const payoutWinner = () => {
    dispatch({ type: 'payout', players })
  }

  // console.log(gameResult.winners)
  const playGame = () => {
    shuffleandSet();
    payBlinds(players);
    // create DEAL PLAYERS FUNCTION
    dealFlop();
    // // FIRST ROUND OF BETS
    // setFlipTable(true)
    // dealTurn();
    // dealRiver();
    // getResult();
    payoutWinner();
    nextGame()
  }

  const shuffleandSet = () => {
    const shuffed = shuffle(liveDeck)
    setLiveDeck(shuffed)
  }

  const dealFlop = () => {
    setCurrentGameStage(Gamestage[1])
    // PlayCardsound()
    if (players[0].hand.length === 0) {
      players.forEach(p => !p.folded && p.hand.push(liveDeck.pop()))
      players.forEach(p => !p.folded && p.hand.push(liveDeck.pop()))
      table.push(liveDeck.pop())
      table.push(liveDeck.pop())
      table.push(liveDeck.pop())
      setLiveDeck([...liveDeck])
      setGameOver(false)
    }
  }

  const dealTurn = () => {
    setCurrentGameStage(Gamestage[2])
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
  }

  const dealRiver = () => {
    setCurrentGameStage(Gamestage[3])
    burnt.push(liveDeck.pop())
    table.push(liveDeck.pop())
    setLiveDeck([...liveDeck])
    setGameOver(false)
  }

  const getResult = async () => {
    if (table.length === 5) {
      const r = await fetchRankingResult()
      console.log(r)
      dispatch({ type: 'set-result', r })
      // setGameResult(r)
    }
  }



  const fetchRankingResult = async () => {
    const finaltable = table.join(',')
    let players: PlayerType[] | string = [...state.players]
    players = players.filter(p => p.hand.length === 2 && { ...p })
    players = players.map(p => `&pc[]=${p.hand.join(',')}`).join('')

    console.log(players, finaltable)

    //   .map(p => `&pc[]=${p.hand.join(',')}`).join('')))

    // .filter((p) => p.hand !== null || undefined || []
    //   .map(p => `&pc[]=${p.hand.join(',')}`).join(''))

    // `&pc[]=${p.hand.join(',')}`).join('')
    // .filter((p) =>
    //   !p.folded && `&pc[]=${p.hand.join(',')}`).join('')

    // players = players.map((p) =>
    //   p.hand && `&pc[]=${p.hand.join(',')}`).join('')

    // console.log(players, finaltable)
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
        <div className="stage-change">
          {currentGameStage === Gamestage[0] && <button onClick={() => dealFlop()}>Deal Flop</button>}
          {currentGameStage === Gamestage[1] && <button onClick={() => dealTurn()}>Deal Turn</button>}
          {currentGameStage === Gamestage[2] && <button onClick={() => dealRiver()}>Deal River</button>}
        </div>
        {table.length === 5 && <button onClick={getResult}>Get result</button>}
        <button onClick={nextGame}>Clear Table / Next Game</button>

      </div>

      {/* DISPLAY TABLE / PLAYERS */}

      <Table table={table} currentGameStage={currentGameStage} dispatch={dispatch} gameResult={state.rankingResult} players={players} pot={state.pot} cardBack={cardBack} flipped={flipped} setFlipped={setFlipped} getCardFace={getCardFace} gameOver={gameOver} bigBlind={bigBlind} smallBlind={smallBlind} flipTable={flipTable} />
      <button onClick={rotatePlayers}>Rotate Dealer</button>


      {/* GAME INFO / STATS DISPLAY */}
      <Gameinfo bigBlind={bigBlind} currentGameStage={currentGameStage} pot={state.pot} smallBlind={smallBlind} gameResult={state.rankingResult} players={players} myError={myError} />
    </div>

  );
}

export default App;
