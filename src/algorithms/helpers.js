export const getNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
};

const isVisitable = (row, col, grid) => {
  return isInside(row, col, grid) && !grid[row][col].isWall
}

const isInside = (row, col, grid) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length
}

export const getUnvisitedNeighbors = (node, grid, diagonalMovement) => {
  const neighbors = [];
  const { col, row } = node;

  let North = false,
      East = false,
      South = false,
      West = false,
      NorthWest = false,
      NorthEast = false,
      SouthEast = false,
      SouthWest = false

  // ↑
  if (isVisitable(row - 1, col, grid)) {
    neighbors.push(grid[row - 1][col]);
    North = true;
  }
  // →
  if (isVisitable(row, col + 1, grid)) {
    neighbors.push(grid[row][col + 1]);
    East = true;
  }
  // ↓
  if (isVisitable(row + 1, col, grid)) {
    neighbors.push(grid[row + 1][col]);
    South = true;
  }
  // ←
  if (isVisitable(row, col - 1, grid)) {
    neighbors.push(grid[row][col - 1]);
    West = true;
  }

  if (diagonalMovement === 'never') {
    return neighbors;
  }

  if (diagonalMovement === 'onlyWhenNoObstacles') {
    NorthWest = West && North;
    NorthEast = North && East;
    SouthEast = East && South;
    SouthWest = South && West;
  } else if (diagonalMovement === 'ifAtMostOneObstacle') {
    NorthWest = West || North;
    NorthEast = North || East;
    SouthEast = East || South;
    SouthWest = South || West;
  } else if (diagonalMovement === 'always') {
    NorthWest = true;
    NorthEast = true;
    SouthEast = true;
    SouthWest = true;
  } else {
    throw new Error('Incorrect value of diagonalMovement');
  }

  // ↖
  if (NorthWest && isVisitable(row - 1, col - 1, grid)) {
    neighbors.push(grid[row - 1][col - 1]);
  }
  // ↗
  if (NorthEast && isVisitable(row - 1, col + 1, grid)) {
    neighbors.push(grid[row - 1][col + 1]);
  }
  // ↘
  if (SouthEast && isVisitable(row + 1, col + 1, grid)) {
    neighbors.push(grid[row + 1][col + 1]);
  }
  // ↙
  if (SouthWest && isVisitable(row + 1, col - 1, grid)) {
    neighbors.push(grid[row + 1][col - 1]);
  }

  return neighbors;
};

// export function getUnvistedNeighbors(node, grid) {
//   const neighbors = getNeighbors(node, grid);
//   return neighbors.filter(neighbor => !neighbor.isVisited);
// }

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  if (!finishNode.previousNode) return [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
