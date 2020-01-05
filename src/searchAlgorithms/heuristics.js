export function euclideanHeuristic(currentNode, finishNode) {
  const euclidDistance = Math.hypot(
    finishNode.row - currentNode.row,
    finishNode.col - currentNode.col
  );
  return euclidDistance;
}

export function manhattanHeuristic(currentNode, finishNode) {
  const manhattanDistance =
    Math.abs(finishNode.row - currentNode.row) +
    Math.abs(finishNode.col - currentNode.col);
  return manhattanDistance;
}

export function octileHeuristic(currentNode, finishNode) {
  const dx = Math.abs(finishNode.col - currentNode.col);
  const dy = Math.abs(finishNode.row - currentNode.row);
  const D1 = 1;
  const D2 = Math.SQRT2;
  return D1 * (dx + dy) + (D2 - 2 * D1) * Math.min(dx, dy);
}

export function chebyshevHeuristic(currentNode, finishNode) {
  const dx = Math.abs(finishNode.col - currentNode.col);
  const dy = Math.abs(finishNode.row - currentNode.row);
  const D1 = 1;
  const D2 = 1;
  return D1 * (dx + dy) + (D2 - 2 * D1) * Math.min(dx, dy);
}
