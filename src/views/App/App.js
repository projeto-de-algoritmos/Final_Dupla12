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
  });

  const container = useRef(null);

  const handleOnStartGame = () => {
    const newMap = new MapGenerator(ROWS, COLS, GAME_ITEMS.length).generate()
    // console.log(newMap)
    setGameState(gameStageChange(gameState, newMap, 'startGame'))
  };

  const handleOnArrowKeyPressed = useCallback(
    (event) => {
      if (!gameState.currentCell || !gameState.map || gameState.isGoalReached) return;
      const { isValid, newPos } = gameState.map.validateStep(gameState.currentCell, event.key);

      if (isValid) {
        const newPosition = newPos
        const itemIndex = gameState.items.findIndex((item) => arraysEqual(item.cell, newPos));
        if (itemIndex >= 0) {
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

  if(gameState.isGoalReached){
    window.alert("Parabéns, você chegou ao Dragão!! Por enquanto é necessário recarregar a página")
  }

  return (
    <div className="root">
      <Header
        points={gameState.points}
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
        />
      </div>
    </div>
  );
}

export default App;
