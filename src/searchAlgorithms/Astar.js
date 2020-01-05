import { getUnvisitedNeighbors } from './helpers';

export const astar = (grid, startNode, finishNode, heuristic, diagonalMovement, diagonalWeight) => {
  let openSet = [];
  const visitedNodesInOrder = []; // closedSet
  openSet.push(startNode);
  startNode.distance = 0;

  startNode.fScore = heuristic(startNode, finishNode);

  while (!!openSet.length) {
    // Current is the node in openSet with the lowest fScore
    let current = openSet.reduce((acc, node) =>
      node.fScore < acc.fScore ? node : acc
    );

    openSet = openSet.filter(node => node !== current);

    if (current.isWall) continue;

    current.isVisited = true;

    // If current is not finish node then:
    // remove current from openSet
    // push into closedSet
    visitedNodesInOrder.push(current);

    if (current === finishNode) return visitedNodesInOrder;

    // closedSet.push(current);

    // Get neighbors and update distances
    const unvisitedNeigbors = getUnvisitedNeighbors(current, grid, diagonalMovement);
    for (const neighbor of unvisitedNeigbors) {
      // Tentative distance to be used if it is first or lower than
      // previous distances
      let tentativeDistance;
      if (diagonalWeight === '1') {
        tentativeDistance = current.distance + 1;
      }
      if (diagonalWeight === 'root2') {
        tentativeDistance = current.distance + ((neighbor.col - current.col === 0 || neighbor.row - current.row === 0) ? 1 : Math.SQRT2);
      }

      // Check if tentativeDistance is lower than any prev distances
      if (tentativeDistance < neighbor.distance) {
        neighbor.previousNode = current;
        neighbor.distance = tentativeDistance;
        neighbor.fScore = neighbor.distance + heuristic(neighbor, finishNode);

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      } else {
        continue;
      }
    }
  }
  return visitedNodesInOrder;
};
