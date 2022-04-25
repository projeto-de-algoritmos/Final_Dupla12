import { arraysEqual } from '../../utils/arrayUtils';
import { KEYBOARD } from '../../assets/consts';

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

// const compareArray = (a, b) => {

// }

class Map {
  constructor(rows, cols, cells, startCell, endCell, randomCellsAmount) {
    this.rows = rows;
    this.cols = cols;
    this.cells = cells;
    this.startCell = startCell;
    this.endCell = endCell;

    const randomCells = new Set();
    while (randomCells.size < randomCellsAmount) {
      const randomCell = this.getRandomCell();
      if (arraysEqual(randomCell, startCell) || arraysEqual(randomCell, endCell))
        continue;

      randomCells.add(randomCell.toString());
    }
    this.randomCells = [...randomCells].map((cell) =>
      cell.split(',').map((splittedCell) => parseInt(splittedCell, 10))
    );
  }

  getCell(x, y) {
    return this.cells[x + y * this.cols];
  }

  getRandomCell() {
    return [generateRandomNumber(0, this.cols), generateRandomNumber(0, this.rows)];
  }

  validateStep(currentCell, action) {
    const newPos = [...currentCell];
    const currCellWalls = this.getCell(...currentCell);
    switch (action) {
      case KEYBOARD.Left:
        if (currentCell[0] - 1 >= 0 && !currCellWalls[3])
          newPos[0] = currentCell[0] - 1;
        break;
      case KEYBOARD.Right:
        if (currentCell[0] + 1 < this.cols && !currCellWalls[1])
          newPos[0] = currentCell[0] + 1;
        break;
      case KEYBOARD.Up:
        if (currentCell[1] - 1 >= 0 && !currCellWalls[0])
          newPos[1] = currentCell[1] - 1;
        break;
      case KEYBOARD.Down:
        if (currentCell[1] + 1 < this.rows && !currCellWalls[2])
          newPos[1] = currentCell[1] + 1;
        break;
      default:
        throw new Error('Unknown key action');
    }

    return {
      isValid: !arraysEqual(currentCell, newPos),
      newPos,
    };
  }

  isGoalReached(currentCell) {
    return arraysEqual(currentCell, this.endCell);
  }

  getItemCellIndex(currentCell) {
    return this.randomCells.findIndex(
      (cell) => arraysEqual(cell, currentCell)
    );
  }

  isItemCell(currentCell) {
    return this.getItemCellIndex(currentCell) !== -1;
  }
}

export default Map;
