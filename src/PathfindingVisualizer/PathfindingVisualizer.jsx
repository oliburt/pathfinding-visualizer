import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra } from '../algorithms/Dijkstra';

import './PathfindingVisualizer.css';
import {
  createGrid,
  getNewGridWithWallToggled,
  fullReset,
  getNewGridWithStartToggled,
  getNewGridWithFinishToggled,
  resetSearch,
  getSpeeds,
  getNewGridWithRandomWalls
} from './utils/gridHelpers';
import { astar } from '../algorithms/Astar';
import { getNodesInShortestPathOrder } from '../algorithms/helpers';
import Bar from './Bar/Bar';

export default class PathfindingVisulaizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false,
    startNode: [14, 19],
    finishNode: [14, 69],
    draggingStartNode: false,
    draggingFinishNode: false,
    searchSpeed: 'fast',
    heuristic: 'manhattan',
    algorithm: 'dijkstra',
    isSearchRunning: false,
    steps: null
  };

  setSearchSpeed = searchSpeed => this.setState({ searchSpeed });

  setIsSearchRunning = bool => this.setState({ isSearchRunning: bool });

  componentDidMount() {
    const grid = createGrid(this.state.startNode, this.state.finishNode);
    this.setState({ grid });
  }

  fullReset = () => {
    const grid = fullReset(this.state.grid);
    this.setState({ grid, steps: null });
  };

  resetSearch = () => {
    const grid = resetSearch(this.state.grid);
    this.setState({ grid, steps: null });
  };

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
      startNode = [row, col];
    } else if (this.state.draggingFinishNode) {
      newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
      finishNode = [row, col];
    } else {
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    }
    this.setState({ grid: newGrid, startNode, finishNode });
  }

  handleAlgChange = algorithm => {
    this.setState({ algorithm });
  };

  handleHeuristicChange = heuristic => {
    this.setState({ heuristic });
  };

  randomWalls = () => {
    const newGrid = getNewGridWithRandomWalls(this.state.grid);
    this.resetSearch();
    this.setState({ grid: newGrid });
  };

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        node.ref.current.className = 'node node-shortest-path';
      }, 50 * i);
    }
    setTimeout(() => {
      this.setIsSearchRunning(false);
      this.setState({steps: nodesInShortestPathOrder.length - 1})
    }, 50 * nodesInShortestPathOrder.length);
  }

  animateSearch(visitedNodesInOrder, nodesInShortestPathOrder) {
    let speed = getSpeeds(this.state.searchSpeed);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speed * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.ref.current.className = 'node node-visited';
      }, speed * i);
    }
  }

  visualizeDijkstra = () => {
    const { grid, startNode, finishNode } = this.state;
    const startNodeObj = grid[startNode[0]][startNode[1]];
    const finishNodeObj = grid[finishNode[0]][finishNode[1]];
    this.resetSearch();
    const visitedNodesInOrder = dijkstra(grid, startNodeObj, finishNodeObj);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeObj);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  visualizeAstar = heuristic => {
    const { grid, startNode, finishNode } = this.state;
    const startNodeObj = grid[startNode[0]][startNode[1]];
    const finishNodeObj = grid[finishNode[0]][finishNode[1]];
    this.resetSearch();
    const visitedNodesInOrder = astar(
      grid,
      startNodeObj,
      finishNodeObj,
      heuristic
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeObj);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  render() {
    const {
      grid,
      mouseIsPressed,
      algorithm,
      heuristic,
      isSearchRunning,
      searchSpeed,
      steps
    } = this.state;

    return (
      <>
        <Bar
          algorithm={algorithm}
          heuristic={heuristic}
          visualizeAstar={this.visualizeAstar}
          visualizeDijkstra={this.visualizeDijkstra}
          fullReset={this.fullReset}
          resetSearch={this.resetSearch}
          handleAlgChange={this.handleAlgChange}
          handleHeuristicChange={this.handleHeuristicChange}
          setIsSearchRunning={this.setIsSearchRunning}
          isSearchRunning={isSearchRunning}
          searchSpeed={searchSpeed}
          setSearchSpeed={this.setSearchSpeed}
          randomWalls={this.randomWalls}
        />
        {steps ? (
          <div className='notification'>
            Steps in path: {steps}
          </div>
        ) : null}
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
