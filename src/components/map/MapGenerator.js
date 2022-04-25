import { COLS } from '../../assets/consts';
import Map from './Map';

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.blockType = 0;
    this.visited = false;
  }
}

class MapGenerator {
  constructor(rows, cols, pickRandomCellsAmount = 2) {
    this.rows = rows;
    this.cols = cols;
    this.stack = [];
    this.pickRandomCellsAmount = pickRandomCellsAmount;
  }

  createGrid() {
    const grid = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        grid.push(new Cell(x, y));
      }
    }
    this.grid = grid;
  }

  createObstacles() {
    this.grid[3 + 0 * COLS].blockType = 1;
    this.grid[3 + 1 * COLS].blockType = 1;
    this.grid[3 + 2 * COLS].blockType = 1;
    this.grid[3 + 5 * COLS].blockType = 1;
    this.grid[3 + 6 * COLS].blockType = 1;
    this.grid[3 + 7 * COLS].blockType = 1;
    this.grid[3 + 8 * COLS].blockType = 1;

    this.grid[5 + 2 * COLS].blockType = 1;
    this.grid[5 + 3 * COLS].blockType = 1;
    this.grid[5 + 4 * COLS].blockType = 1;
    this.grid[5 + 5 * COLS].blockType = 1;

    this.grid[12 + 0 * COLS].blockType = 1;
    this.grid[12 + 1 * COLS].blockType = 1;
    this.grid[12 + 2 * COLS].blockType = 1;
    this.grid[12 + 3 * COLS].blockType = 1;

    this.grid[7 + 6 * COLS].blockType = 1;
    this.grid[7 + 7 * COLS].blockType = 1;
    this.grid[7 + 8 * COLS].blockType = 1;
    this.grid[7 + 9 * COLS].blockType = 1;
    this.grid[7 + 10 * COLS].blockType = 1;
    this.grid[6 + 10 * COLS].blockType = 1;
    this.grid[5 + 10 * COLS].blockType = 1;
    this.grid[4 + 10 * COLS].blockType = 1;
    this.grid[3 + 10 * COLS].blockType = 1;
    this.grid[2 + 10 * COLS].blockType = 1;
    this.grid[1 + 10 * COLS].blockType = 1;
    this.grid[0 + 10 * COLS].blockType = 1;

    this.grid[8 + 6 * COLS].blockType = 1;
    this.grid[10 + 6 * COLS].blockType = 1;
    this.grid[12 + 6 * COLS].blockType = 1;
    this.grid[14 + 6 * COLS].blockType = 1;
    this.grid[16 + 6 * COLS].blockType = 1;
    this.grid[9 + 8 * COLS].blockType = 1;
    this.grid[11 + 8 * COLS].blockType = 1;
    this.grid[13 + 8 * COLS].blockType = 1;
    this.grid[15 + 8 * COLS].blockType = 1;
    this.grid[10 + 10 * COLS].blockType = 1;
    this.grid[12 + 10 * COLS].blockType = 1;
    this.grid[14 + 10 * COLS].blockType = 1;

    this.grid[14 + 11 * COLS].blockType = 1;
    this.grid[14 + 12 * COLS].blockType = 1;
    this.grid[14 + 13 * COLS].blockType = 1;
    this.grid[14 + 14 * COLS].blockType = 1;
    this.grid[14 + 15 * COLS].blockType = 1;

    this.grid[20 + 0 * COLS].blockType = 1;
    this.grid[20 + 1 * COLS].blockType = 1;
    this.grid[20 + 2 * COLS].blockType = 1;
    this.grid[21 + 2 * COLS].blockType = 1;
    this.grid[22 + 2 * COLS].blockType = 1;
    this.grid[23 + 2 * COLS].blockType = 1;
    this.grid[23 + 3 * COLS].blockType = 1;

    this.grid[20 + 6 * COLS].blockType = 1;
    this.grid[21 + 6 * COLS].blockType = 1;
    this.grid[22 + 6 * COLS].blockType = 1;
    this.grid[23 + 6 * COLS].blockType = 1;
    this.grid[24 + 6 * COLS].blockType = 1;
    this.grid[25 + 6 * COLS].blockType = 1;
    this.grid[20 + 7 * COLS].blockType = 1;
    this.grid[20 + 9 * COLS].blockType = 1;
    this.grid[20 + 10 * COLS].blockType = 1;
    this.grid[21 + 10 * COLS].blockType = 1;
    this.grid[22 + 10 * COLS].blockType = 1;
    this.grid[23 + 10 * COLS].blockType = 1;
    this.grid[24 + 10 * COLS].blockType = 1;
    this.grid[25 + 10 * COLS].blockType = 1;
  }

  createLava() {
    this.grid[0 + 11 * COLS].blockType = 2;
    this.grid[1 + 11 * COLS].blockType = 2;
    this.grid[2 + 11 * COLS].blockType = 2;
    this.grid[3 + 11 * COLS].blockType = 2;
    this.grid[4 + 11 * COLS].blockType = 2;
    this.grid[5 + 11 * COLS].blockType = 2;
    this.grid[6 + 11 * COLS].blockType = 2;
    this.grid[7 + 11 * COLS].blockType = 2;
    
    this.grid[1 + 13 * COLS].blockType = 2;
    this.grid[2 + 13 * COLS].blockType = 2;
    this.grid[3 + 13 * COLS].blockType = 2;
    this.grid[4 + 13 * COLS].blockType = 2;
    this.grid[5 + 13 * COLS].blockType = 2;
    this.grid[6 + 13 * COLS].blockType = 2;
    this.grid[7 + 13 * COLS].blockType = 2;
    this.grid[8 + 13 * COLS].blockType = 2;
    this.grid[9 + 13 * COLS].blockType = 2;
    this.grid[10 + 13 * COLS].blockType = 2;
    this.grid[11 + 13 * COLS].blockType = 2;
    this.grid[12 + 13 * COLS].blockType = 2;
    this.grid[13 + 13 * COLS].blockType = 2;

    this.grid[0 + 15 * COLS].blockType = 2;
    this.grid[1 + 15 * COLS].blockType = 2;
    this.grid[2 + 15 * COLS].blockType = 2;
    this.grid[3 + 15 * COLS].blockType = 2;
    this.grid[4 + 15 * COLS].blockType = 2;
    this.grid[5 + 15 * COLS].blockType = 2;
    this.grid[6 + 15 * COLS].blockType = 2;
    this.grid[7 + 15 * COLS].blockType = 2;
    this.grid[8 + 15 * COLS].blockType = 2;
    this.grid[9 + 15 * COLS].blockType = 2;
    this.grid[10 + 15 * COLS].blockType = 2;
    this.grid[11 + 15 * COLS].blockType = 2;
    this.grid[12 + 15 * COLS].blockType = 2;

    this.grid[7 + 1 * COLS].blockType = 2;
    this.grid[8 + 1 * COLS].blockType = 2;
    this.grid[9 + 1 * COLS].blockType = 2;
    this.grid[10 + 1 * COLS].blockType = 2;
    this.grid[7 + 2 * COLS].blockType = 2;
    this.grid[8 + 2 * COLS].blockType = 2;
    this.grid[9 + 2 * COLS].blockType = 2;
    this.grid[10 + 2 * COLS].blockType = 2;
    this.grid[7 + 3 * COLS].blockType = 2;
    this.grid[8 + 3 * COLS].blockType = 2;
    this.grid[9 + 3 * COLS].blockType = 2;
    this.grid[10 + 3 * COLS].blockType = 2;
    this.grid[7 + 4 * COLS].blockType = 2;
    this.grid[8 + 4 * COLS].blockType = 2;
    this.grid[9 + 4 * COLS].blockType = 2;
    this.grid[10 + 4 * COLS].blockType = 2;

    this.grid[15 + 1 * COLS].blockType = 2;
    this.grid[17 + 1 * COLS].blockType = 2;
    this.grid[15 + 2 * COLS].blockType = 2;
    this.grid[17 + 2 * COLS].blockType = 2;
    this.grid[15 + 3 * COLS].blockType = 2;
    this.grid[17 + 3 * COLS].blockType = 2;
    this.grid[15 + 4 * COLS].blockType = 2;
    this.grid[17 + 4 * COLS].blockType = 2;

    this.grid[21 + 7 * COLS].blockType = 2;
    this.grid[22 + 7 * COLS].blockType = 2;
    this.grid[23 + 7 * COLS].blockType = 2;
    this.grid[24 + 7 * COLS].blockType = 2;
    this.grid[25 + 7 * COLS].blockType = 2;

    this.grid[25 + 8 * COLS].blockType = 2;

    this.grid[21 + 9 * COLS].blockType = 2;
    this.grid[22 + 9 * COLS].blockType = 2;
    this.grid[23 + 9 * COLS].blockType = 2;
    this.grid[24 + 9 * COLS].blockType = 2;
    this.grid[25 + 9 * COLS].blockType = 2;

    this.grid[16 + 12 * COLS].blockType = 2;
    this.grid[18 + 12 * COLS].blockType = 2;
    this.grid[20 + 12 * COLS].blockType = 2;
    this.grid[22 + 12 * COLS].blockType = 2;
    this.grid[24 + 12 * COLS].blockType = 2;

    this.grid[16 + 14 * COLS].blockType = 2;
    this.grid[18 + 14 * COLS].blockType = 2;
    this.grid[20 + 14 * COLS].blockType = 2;
    this.grid[22 + 14 * COLS].blockType = 2;
    this.grid[24 + 14 * COLS].blockType = 2;
  }

  getCell(y, x) {
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) {
      return null;
    }
    return this.grid[x + y * this.cols];
  }

  checkNeighbors() {
    const x = this.current.x;
    const y = this.current.y;
    const top = this.getCell(y - 1, x);
    const right = this.getCell(y, x + 1);
    const bottom = this.getCell(y + 1, x);
    const left = this.getCell(y, x - 1);
    const neighbors = [top, right, bottom, left].filter((c) => !!c && !c.visited);

    if (neighbors.length === 0) {
      return null;
    }

    const r = Math.floor(Math.random() * neighbors.length);
    return neighbors[r];
  }

  carve() {
    const next = this.checkNeighbors();
    if (next) {
      next.visited = true;
      this.stack.push(this.current);
      this.current = next;
      this.carve();
    } else if (this.stack.length > 0) {
      this.current = this.stack.pop();
      this.carve();
    }
  }

  generate() {
    this.createGrid();
    this.createObstacles()
    this.createLava()
    this.current = this.grid[0];
    this.current.visited = true;
    this.carve();

    return new Map(
      this.rows,
      this.cols,
      this.grid,
      [0, 0],
      [23, 8],
      this.pickRandomCellsAmount
    );
  }
}

export default MapGenerator;
