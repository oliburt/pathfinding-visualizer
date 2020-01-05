import { getUnvistedNeighbors } from './helpers';

export const astar = (grid, startNode, finishNode, heuristic) => {
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
    const unvisitedNeigbors = getUnvistedNeighbors(current, grid);
    for (const neighbor of unvisitedNeigbors) {
      // Tentative distance to be used if it is first or lower than
      // previous distances
      const tentativeDistance = current.distance + 1;

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
