import { GAME_ITEMS } from '../assets/consts.js';

export const knapSack = (bagCapacity) => {
  let itemsLength = GAME_ITEMS.length + 1;
  let memoization = new Array(itemsLength).fill(0).map(() => new Array(bagCapacity + 1).fill(0));
  let trackBack = new Array(itemsLength).fill(0).map(() => new Array(bagCapacity + 1).fill(0));

  for (let i = 1; i < itemsLength; i++) {
    for (let w = 1; w <= bagCapacity; w++) {
      if (GAME_ITEMS[i - 1].weight > w)
        memoization[i][w] = memoization[i - 1][w]
      else {
        let maxA = GAME_ITEMS[i - 1].points + memoization[i - 1][(w - GAME_ITEMS[i - 1].weight)]
        let maxB = memoization[i - 1][w]
        if (maxB > maxA) {
          memoization[i][w] = maxB
        }
        else {
          memoization[i][w] = maxA
          trackBack[i][w] = 1
        }
      }
    }
  }
  return trackBackItems(trackBack, bagCapacity)
};

const trackBackItems = (trackBackMatrix, weight) => {
  let solutionItems = []
  let w = weight
  let i = GAME_ITEMS.length
  while (i > 0) {
    if (trackBackMatrix[i][w] === 1) {
      solutionItems.push(GAME_ITEMS[i - 1].name);
      w = w - GAME_ITEMS[i - 1].weight;
    }
    i--;
  }
  return solutionItems;
}