import { arraysEqual } from '../../utils/arrayUtils';
import { KEYBOARD } from '../../assets/consts';

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

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
    let generatedCell;
    do{
      generatedCell = [generateRandomNumber(0, this.cols), generateRandomNumber(0, this.rows)];
    }while(this.getCell(generatedCell[0], generatedCell[1]).blockType === 1)
    return generatedCell;
  }

  validateStep(currentCell, action) {
    const newPos = [...currentCell];
    switch (action) {
      case KEYBOARD.Left:
        if (currentCell[0] - 1 >= 0 && this.getCell(currentCell[0] - 1, currentCell[1]).blockType !== 1)
          newPos[0] = currentCell[0] - 1;
        break;
      case KEYBOARD.Right:
        if (currentCell[0] + 1 < this.cols && this.getCell(currentCell[0] + 1, currentCell[1]).blockType !== 1)
          newPos[0] = currentCell[0] + 1;
        break;
      case KEYBOARD.Up:
        if (currentCell[1] - 1 >= 0 && this.getCell(currentCell[0], currentCell[1] - 1).blockType !== 1)
          newPos[1] = currentCell[1] - 1;
        break;
      case KEYBOARD.Down:
        if (currentCell[1] + 1 < this.rows && this.getCell(currentCell[0], currentCell[1] + 1).blockType !== 1)
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
