import { fullReset } from './../PathfindingVisualizer/utils/gridHelpers';

export function recursiveDivisionMaze(grid) {
  const wallNodesInOrder = [];
  const newGrid = fullReset(grid);
  addOuterWalls(newGrid, wallNodesInOrder);

  //   var ent = addEntrance();
  addInnerWalls(
    true,
    1,
    newGrid[0].length - 2,
    1,
    newGrid.length - 2,
    newGrid,
    wallNodesInOrder
  );
  return { newGrid, wallNodesInOrder };
}

function isAvailable(node) {
  return !node.isStart && !node.isFinish && !node.isWall;
}

export function addOuterWalls(grid, wallNodesInOrder) {
  for (var i = 0; i < grid.length; i++) {
    if (i === 0 || i === grid.length - 1) {
      for (var j = 0; j < grid[i].length; j++) {
        if (isAvailable(grid[i][j])) {
          grid[i][j].isWall = true;
          wallNodesInOrder.push(grid[i][j]);
        }
      }
    } else {
      if (isAvailable(grid[i][0])) {
        grid[i][0].isWall = true;
        wallNodesInOrder.push(grid[i][0]);
      }
      if (isAvailable(grid[i][grid[0].length - 1])) {
        grid[i][grid[0].length - 1].isWall = true;
        wallNodesInOrder.push(grid[i][grid[0].length - 1]);
      }
    }
  }
}

// function addEntrance() {
//   var x = randomNumber(1, grid.length - 1);
//   grid[grid.length - 1][x] = 'g';
//   return x;
// }

function addInnerWalls(h, minX, maxX, minY, maxY, grid, wallNodesInOrder) {
  if (h) {
    if (maxX - minX < 2) {
      return;
    }

    var y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
    addHWall(minX, maxX, y, grid, wallNodesInOrder);

    addInnerWalls(!h, minX, maxX, minY, y - 1, grid, wallNodesInOrder);
    addInnerWalls(!h, minX, maxX, y + 1, maxY, grid, wallNodesInOrder);
  } else {
    if (maxY - minY < 2) {
      return;
    }

    var x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
    addVWall(minY, maxY, x, grid, wallNodesInOrder);

    addInnerWalls(!h, minX, x - 1, minY, maxY, grid, wallNodesInOrder);
    addInnerWalls(!h, x + 1, maxX, minY, maxY, grid, wallNodesInOrder);
  }
}

function addHWall(minX, maxX, y, grid, wallNodesInOrder) {
  var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
  //   var hole = getHole(minX, maxX, grid[0].length);
  for (var i = minX; i <= maxX; i++) {
    if (i === hole) {
      grid[y][i].isWall = false;
    } else {
      if (isAvailable(grid[y][i])) {
        grid[y][i].isWall = true;
        wallNodesInOrder.push(grid[y][i]);
      }
    }
  }
}

function addVWall(minY, maxY, x, grid, wallNodesInOrder) {
  var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  //   var hole = getHole(minY, maxY, grid.length);
  for (var i = minY; i <= maxY; i++) {
    if (i === hole) {
      if (i === 0) console.log('i is 0');
      if (i === grid.length) console.log('i is length');
      grid[i][x].iWall = false;
    } else {
      if (isAvailable(grid[i][x])) {
        grid[i][x].isWall = true;
        wallNodesInOrder.push(grid[i][x]);
      }
    }
  }
}

// function getHole(min, max, upperLimit) {
//   var hole = Math.floor(randomNumber(min, max) / 2) * 2 + 1;
//   if (hole > 0 && hole < upperLimit) {
//     return hole;
//   } else {
//     return getHole(min, max, upperLimit);
//   }
// }

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function checkEveryNodeInMazeIsWallInGrid(mazeNodes, grid) {
  return mazeNodes.reduce((acc, node) => {
    if (acc === false) {
      return false;
    } else if (node.isWall && !grid[node.row][node.col].isWall) {
      console.log('wall not in grid');
      return false;
    } else if (!node.isWall && grid[node.row][node.col].isWall) {
      console.log('wall in grid');

      return false;
    } else {
        return true
    }
  });
}
