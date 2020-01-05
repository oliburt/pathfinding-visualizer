import { astar } from './Astar';

// The same as aStar but heuristic function returns 0
export const dijkstra2 = (
  grid,
  startNode,
  finishNode,
  diagonalMovement,
  diagonalWeight
) => {
  function heuristic() {
    return 0;
  }

  return astar(
    grid,
    startNode,
    finishNode,
    heuristic,
    diagonalMovement,
    diagonalWeight
  );
};
