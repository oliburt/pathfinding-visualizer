export const getNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
};

export function getUnvistedNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function euclideanHeuristic(currentNode, finishNode) {
    const euclidDistance = Math.hypot(finishNode.row - currentNode.row, finishNode.col - currentNode.col)
    return euclidDistance
}

export function manhattanHeuristic(currentNode, finishNode) {
    const manhattanDistance = Math.abs(finishNode.row - currentNode.row) + Math.abs(finishNode.col - currentNode.col)
    return manhattanDistance
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }