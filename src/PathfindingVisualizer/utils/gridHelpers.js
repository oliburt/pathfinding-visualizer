import React from 'react';

const createNode = (col, row, startNode, finishNode) => {
  return {
    col,
    row,
    isWall: false,
    isStart: row === startNode[0] && col === startNode[1],
    isFinish: row === finishNode[0] && col === finishNode[1],
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    ref: React.createRef(),
    fScore: Infinity
  };
};

export const getSpeeds = searchSpeed => {
  if (searchSpeed === 'fast') return 10;
  if (searchSpeed === 'average') return 60;
  if (searchSpeed === 'slow') return 80;
};

export const createGrid = (startNode, finishNode) => {
  const grid = [];
  for (let row = 0; row < 29; row++) {
    const currentRow = [];
    for (let col = 0; col < 89; col++) {
      currentRow.push(createNode(col, row, startNode, finishNode));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const resetSearch = grid => {
  const newGrid = deepCloneGrid(grid);
  newGrid.forEach(row => {
    row.forEach(node => {
      if (node.isStart) {
        node.ref.current.className = 'node node-start';
      } else if (node.isFinish) {
        node.ref.current.className = 'node node-finish';
      } else if (node.isWall) {
        node.ref.current.className = 'node node-wall';
      } else {
        node.ref.current.className = 'node';
      }
      node.distance = Infinity;
      node.isVisited = false;
      node.previousNode = null;
      node.fScore = Infinity;
    });
  });
  return newGrid;
};

export const fullReset = grid => {
  const newGrid = deepCloneGrid(grid);
  newGrid.forEach(row => {
    row.forEach(node => {
      if (node.isStart) {
        node.ref.current.className = 'node node-start';
      } else if (node.isFinish) {
        node.ref.current.className = 'node node-finish';
      } else {
        node.ref.current.className = 'node';
      }
      node.isWall = false;
      node.distance = Infinity;
      node.isVisited = false;
      node.previousNode = null;
      node.fScore = Infinity;
    });
  });
  return newGrid;
};

export const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = deepCloneGrid(grid);
  const node = newGrid[row][col];
  if (node.isStart || node.isFinish) return newGrid;
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};



export const getNewGridWithStartToggled = (grid, row, col) => {
  const newGrid = noStartNodes(grid);
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: true
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const noStartNodes = grid => {
  const newGrid = deepCloneGrid(grid);

  return newGrid.map(row => {
    return row.map(node => ({ ...node, isStart: false }));
  });
};

export const getNewGridWithFinishToggled = (grid, row, col) => {
  const newGrid = noFinishNodes(grid);
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: true
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const noFinishNodes = grid => {
  const newGrid = deepCloneGrid(grid);
  return newGrid.map(row => {
    return row.map(node => ({ ...node, isFinish: false }));
  });
};

export const deepCloneGrid = grid => {
  return grid.map(row => {
    return row.map(node => {
      return {
        ...node
      };
    });
  });
};
