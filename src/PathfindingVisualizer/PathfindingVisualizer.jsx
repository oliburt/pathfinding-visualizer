import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/Dijkstra';

import './PathfindingVisualizer.css';
import {
  createGrid,
  getNewGridWithWallToggled,
  resetGrid,
  getNewGridWithStartToggled,
  getNewGridWithFinishToggled
} from './utils/gridHelpers';

export default class PathfindingVisulaizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false,
    startNode: [10, 15],
    finishNode: [10, 35],
    draggingStartNode: false,
    draggingFinishNode: false
  };

  componentDidMount() {
    const grid = createGrid(this.state.startNode, this.state.finishNode);
    this.setState({ grid });
  }

  resetGrid() {
    const grid = resetGrid(this.state.grid);
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const node = this.state.grid[row][col];
    if (node.isStart) {
      this.setState({ mouseIsPressed: true, draggingStartNode: true });
    } else if (node.isFinish) {
      this.setState({ mouseIsPressed: true, draggingFinishNode: true });
    } else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseUp() {
    this.setState({
      mouseIsPressed: false,
      draggingFinishNode: false,
      draggingStartNode: false
    });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    let newGrid;
    let startNode = this.state.startNode;
    let finishNode = this.state.finishNode;
    if (this.state.draggingStartNode) {
      newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
      startNode = [row, col]
    } else if (this.state.draggingFinishNode) {
      newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
      finishNode = [row, col]
    } else {
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    }
    this.setState({ grid: newGrid, startNode, finishNode });
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        node.ref.current.className = 'node node-shortest-path';
      }, 50 * i);
    }
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.ref.current.className = 'node node-visited';
      }, 10 * i);
    }
  }

  visualizeDijkstra() {
    const { grid, startNode, finishNode } = this.state;
    const startNodeObj = grid[startNode[0]][startNode[1]];
    const finishNodeObj = grid[finishNode[0]][finishNode[1]];
    const visitedNodesInOrder = dijkstra(grid, startNodeObj, finishNodeObj);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeObj);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Djikstra's Algorithm
        </button>
        <button onClick={() => this.resetGrid()}>Reset</button>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isFinish, isStart, isWall, ref } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      row={row}
                      col={col}
                      theRef={ref}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
