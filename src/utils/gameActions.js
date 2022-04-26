import {
  GAME_ITEMS,
  MOVEMENT_REWARD,
} from '../assets/consts';

export function gameStageChange(previousState, data, action) {
  switch (action) {
    case 'startGame': {
      let items = [];

      for (let aux = 0; aux < GAME_ITEMS.length; aux++) {
        items.push({
          ...GAME_ITEMS[aux],
          isTaken: false,
          cell: data.map.randomCells[aux],
        });
      }

      return {
        ...previousState,
        map: data.map,
        bestItems: data.bestItems,
        currentCell: [0, 0],
        visitedCells: new Set(),
        isGoalReached: false,
        started: true,
        items: items,
        currentWeight: 0,
        lifePoints: 3,
        points: 0,
        reachedItems: [],
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
        reachedItems: [...previousState.reachedItems, GAME_ITEMS[index].name],
        currentWeight: previousState.currentWeight + (!previousState.items[index].isTaken ? previousState.items[index].weight : 0),
        points: previousState.points + (!previousState.items[index].isTaken ? previousState.items[index].points : 0),
        items: previousState.items.map((p, idx) =>
          idx === index ? { ...p, isTaken: true } : p
        ),
        currentCell: data.newPosition,
        visitedCells: new Set([...previousState.visitedCells, data.newPosition.toString()]),
      };
    }
    case 'moveCharacter': {
      const isVisited = previousState.visitedCells.has(data.toString());
      let points = previousState.points;
      let lifePoints = previousState.lifePoints;
      if (previousState.map.getCell(data[0], data[1]).blockType === 2) {
        lifePoints--;
      } else {
        points = previousState.points + (!isVisited ? MOVEMENT_REWARD : 0);
      }

      return {
        ...previousState,
        currentCell: data,
        points: points,
        lifePoints: lifePoints,
        visitedCells: new Set([...previousState.visitedCells, data.toString()]),
      };
    }
    default:
      throw new Error('Unknown action');
  }
}