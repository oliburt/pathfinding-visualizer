import { deepCloneGrid } from '../PathfindingVisualizer/utils/gridHelpers';
import { shuffle } from './randomWalls';

export const recursiveBacktracking = grid => {
  const nonWallNodesInOrder = [];
  let newGrid = deepCloneGrid(grid);
  newGrid = setAllWalls(newGrid);
  const currentNode = grid[1][1];
  currentNode.isWall = false;
  nonWallNodesInOrder.push(currentNode);
  recursion(currentNode, newGrid, nonWallNodesInOrder);

  return {
    newGrid,
    nonWallNodesInOrder
  };
};

function recursion(currentNode, grid, nonWallNodesInOrder) {
  let directions = getRandomDirections();
  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];

    if (isVisitable(direction, currentNode, grid)) {
      const nextNode = takeStep(
        direction,
        currentNode,
        grid,
        nonWallNodesInOrder
      );
      recursion(nextNode, grid, nonWallNodesInOrder);
    } else {
      continue;
    }
  }
}

function takeStep(direction, currentNode, grid, nonWallNodesInOrder) {
  let middleNode;
  let nextNode;
  if (direction === 'North') {
    middleNode = grid[currentNode.row - 1][currentNode.col];
    nextNode = grid[currentNode.row - 2][currentNode.col];
    middleNode.isWall = false;
    nonWallNodesInOrder.push(middleNode);
    nextNode.isWall = false;
    nonWallNodesInOrder.push(nextNode);
  }
  if (direction === 'East') {
    middleNode = grid[currentNode.row][currentNode.col + 1];
    nextNode = grid[currentNode.row][currentNode.col + 2];
    middleNode.isWall = false;
    nonWallNodesInOrder.push(middleNode);
    nextNode.isWall = false;
    nonWallNodesInOrder.push(nextNode);
  }
  if (direction === 'South') {
    middleNode = grid[currentNode.row + 1][currentNode.col];
    nextNode = grid[currentNode.row + 2][currentNode.col];
    middleNode.isWall = false;
    nonWallNodesInOrder.push(middleNode);
    nextNode.isWall = false;
    nonWallNodesInOrder.push(nextNode);
  }
  if (direction === 'West') {
    middleNode = grid[currentNode.row][currentNode.col - 1];
    nextNode = grid[currentNode.row][currentNode.col - 2];
    middleNode.isWall = false;
    nonWallNodesInOrder.push(middleNode);
    nextNode.isWall = false;
    nonWallNodesInOrder.push(nextNode);
  }
  return nextNode;
}

function isVisitable(direction, currentNode, grid) {
  let x = currentNode.col,
    y = currentNode.row;
  if (direction === 'North') y -= 2;
  if (direction === 'East') x += 2;
  if (direction === 'South') y += 2;
  if (direction === 'West') x -= 2;

  return isInsideOuterWalls(x, y, grid) && isAWall(x, y, grid);
}

function isAWall(col, row, grid) {
  return grid[row][col].isWall;
}

function isInsideOuterWalls(col, row, grid) {
  return col > 0 && col < grid[0].length && row > 0 && row < grid.length;
}

const getRandomDirections = () => {
  const directions = ['North', 'East', 'South', 'West'];
  return shuffle(directions);
};

const setAllWalls = grid => {
  return grid.map(row =>
    row.map(node => {
      if (!node.isStart && !node.isFinish) node.isWall = true;
      return node;
    })
  );
};
