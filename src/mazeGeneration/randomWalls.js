import { fullReset } from '../PathfindingVisualizer/utils/gridHelpers';

export const getNewGridWithRandomWalls = grid => {
  const resetGrid = fullReset(grid);
  const wallNodesInOrder = [];
  const newGrid = resetGrid.map(row => {
    return row.map(node => {
      if (Math.random() < 0.3 && !node.isStart && !node.isFinish) {
        node.isWall = true;
        wallNodesInOrder.push(node);
      } else {
        node.isWall = false;
      }
      return node;
    });
  });
  shuffle(wallNodesInOrder)
  return { newGrid, wallNodesInOrder };
};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
