import React, { useCallback, useEffect, useRef } from 'react';
import './App.css';
import Header from '../../components/header/Header';
import Notification from '../../components/notification/Notification';
import MapGenerator from '../../components/map/MapGenerator';
import Board from '../../components/board/Board';
import {
  COLS,
  KEYBOARD,
  GAME_ITEMS,
  ROWS,
} from '../../assets/consts';
import { arraysEqual } from '../../utils/arrayUtils';
import { gameStageChange } from '../../utils/gameActions';
import { knapSack } from '../../utils/knapsackPD';


const equals = (a, b) =>
  a.length === b.length &&
  a.every((v) => b.includes(v))

function useKey(keys, action) {
  const noop = () => { };
  const actionRef = useRef(noop);
  actionRef.current = action;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (keys.includes(event.key)) {
        event.preventDefault();
        if (actionRef.current) {
          actionRef.current(event);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [keys])
}

function App() {
  const [gameState, setGameState] = React.useState({
    points: 0,
    map: undefined,
    currentCell: [0, 0],
    visitedCells: new Set(),
    isGoalReached: false,
    started: false,
    items: [],
    reachedItems: [],
    bestItems: [],
    backpackSize: "15",
    currentWeight: 0,
    lifePoints: 3,
  });

  const container = useRef(null);

  const handleOnStartGame = () => {
    const newMap = new MapGenerator(ROWS, COLS, GAME_ITEMS.length).generate()
    const newBestItems = knapSack(gameState.backpackSize)

    setGameState(gameStageChange(gameState, { map: newMap, bestItems: newBestItems }, 'startGame'))
    // let bestItemsPosition = [];
    // newBestItems.map(item => {
    //   bestItemsPosition.push(newMap.randomCells[GAME_ITEMS.find(el => el.name == item).id])
    // })
    // console.log(bestItemsPosition)
    // setGameState({...gameState, bestItems: bestItemsPosition})
  };

  const handleBackpackChange = (value) => {
    setGameState({ ...gameState, backpackSize: value })
  }

  const handleOnArrowKeyPressed = useCallback(
    (event) => {
      if (!gameState.currentCell || !gameState.map || gameState.isGoalReached) return;
      const { isValid, newPos } = gameState.map.validateStep(gameState.currentCell, event.key);

      if (isValid) {
        const newPosition = newPos
        const itemIndex = gameState.items.findIndex((item) => arraysEqual(item.cell, newPos));

        if (itemIndex >= 0 && gameState.currentWeight + GAME_ITEMS[itemIndex].weight <= gameState.backpackSize) {
          const data = { 'index': itemIndex, 'newPosition': newPosition }
          setGameState(gameStageChange(gameState, data, 'reachItem'))
        } else if (gameState.map.isGoalReached(newPos)) {
          setGameState(gameStageChange(gameState, null, 'reachGoal'))
        }
        else {
          setGameState(gameStageChange(gameState, newPosition, 'moveCharacter'))
        }
      }
    },
    [gameState]
  );

  useKey([KEYBOARD.Enter], handleOnStartGame);
  useKey([KEYBOARD.Left, KEYBOARD.Right, KEYBOARD.Up, KEYBOARD.Down], handleOnArrowKeyPressed);

  if (gameState.isGoalReached) {
    console.log(gameState.reachedItems)
    console.log(gameState.bestItems)
    if (equals(gameState.reachedItems, gameState.bestItems))
      window.alert("Parabéns, você enfrentou o dragão e conseguiu salvar a Fiona.")
    else
      window.alert("Infelizmente você não escolheu os melhores itens e o dragão o baforou para longe do castelo, pobre Fiona, terá que esperar novamente um cavaleiro para salvá-la.")
    handleOnStartGame()
  }

  if (gameState.lifePoints === 0) {
    window.alert("Que pena, você morreu para a lava! =(")
    handleOnStartGame()
  }

  return (
    <div className="root">
      <Header
        points={gameState.points}
        bestItems={gameState.bestItems}
        currentWeight={gameState.currentWeight}
        backpackSize={gameState.backpackSize}
        lifePoints={gameState.lifePoints}
      />
      <div className="container" ref={container}>
        <Board
          map={gameState.map}
          currentCell={gameState.currentCell}
          items={gameState.items}
          forwardedRef={container}
        />
        <Notification
          show={!gameState.started}
          handleOnStartGame={handleOnStartGame}
          checked={gameState.backpackSize}
          handleBackpackChange={value => handleBackpackChange(value)}
        />
      </div>
    </div>
  );
}

export default App;
