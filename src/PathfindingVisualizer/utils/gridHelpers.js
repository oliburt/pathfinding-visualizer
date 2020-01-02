const createNode = (col, row, START_NODE, FINISH_NODE) => {
  return {
    col,
    row,
    isStart: row === START_NODE[0] && col === START_NODE[1],
    isFinish: row === FINISH_NODE[0] && col === FINISH_NODE[1],
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

export const createGrid = (START_NODE, FINISH_NODE) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row, START_NODE, FINISH_NODE));
    }
    grid.push(currentRow);
  }
  return grid;
};


export const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
