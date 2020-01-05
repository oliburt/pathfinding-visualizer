import { getUnvisitedNeighbors } from './helpers';

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export function dijkstra(grid, startNode, finishNode, diagonalMovement, diagonalWeight) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid, diagonalMovement, diagonalWeight);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, diagonalMovement, diagonalWeight) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, diagonalMovement);
  for (const neighbor of unvisitedNeighbors) {
    if (diagonalWeight === '1') {
      neighbor.distance = node.distance + 1;
    }
    if (diagonalWeight === 'root2') {
      neighbor.distance = node.distance + ((neighbor.col - node.col === 0 || neighbor.row - node.row === 0) ? 1 : Math.SQRT2);
    }
    neighbor.previousNode = node;
  }
}


