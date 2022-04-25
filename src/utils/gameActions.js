import {
    GAME_ITEMS,
    MOVEMENT_REWARD,
  } from '../assets/consts';

export function gameStageChange(previousState, data, action) {
    switch (action) {
      case 'startGame': {
          let items = [];

          for(let aux = 0; aux < GAME_ITEMS.length; aux++){
            items.push({
                ...GAME_ITEMS[aux],
                isTaken: false,
                cell: data.randomCells[aux],
              });
          }
        
        return {
          ...previousState,
          map: data,
          currentCell: data.startCell,
          visitedCells: new Set(),
          isGoalReached: false,
          started: true,
          items: items,
        };
      }
      case 'reachGoal': {
        return {
          ...previousState,
          isGoalReached: true,
          points: previousState.points + previousState.round * 100,
        };
      }
      case 'winGame': {
        return {
          ...previousState,
        //   map: data,
        //   currentCell: data.startCell,
          visitedCells: new Set(),
          isGoalReached: false,
          started: false,
          items: [],
        };
      }
      case 'addItem': {
        const index = data;
  
        const item = {
          ...GAME_ITEMS[index],
          isTaken: false,
          cell: previousState.map.randomCells[index],
        };
  
        return {
          ...previousState,
          items: [...previousState.items, item],
        };
      }
      case 'reachItem': {
        const index = data.index;
        //const isVisited = previousState.visitedCells.has(data.newPosition.toString());
  
        return {
          ...previousState,
          points: previousState.points + (!previousState.items[index].isTaken ? previousState.items[index].points : 0),
          items: previousState.items.map((p, idx) =>
            idx === index ? { ...p, isTaken: true} : p
          ),
          currentCell: data.newPosition,
          visitedCells: new Set([...previousState.visitedCells, data.newPosition.toString()]),
        };
      }
      case 'moveCharacter': {
        const isVisited = previousState.visitedCells.has(data.toString());
  
        return {
          ...previousState,
          currentCell: data,
          points: previousState.points + (!isVisited ? MOVEMENT_REWARD : 0),
          visitedCells: new Set([...previousState.visitedCells, data.toString()]),
        };
      }
      default:
        throw new Error('Unknown action');
    }
  }