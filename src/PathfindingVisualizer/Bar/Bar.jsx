import React, { Component } from 'react';

import './Bar.css';
import {
  euclideanHeuristic,
  manhattanHeuristic,
  octileHeuristic,
  chebyshevHeuristic
} from '../../searchAlgorithms/heuristics';
import ResetButtons from './components/ResetButtons';
import AlgOptions from './components/AlgOptions';
import ObstacleButtons from './components/ObstacleButtons';
import DiagonalOptions from './components/DiagonalOptions';

export default class Bar extends Component {
  heuristicAlg(heuristic, alg) {
    const { visualizeAstar } = this.props;

    if (alg === 'astar') {
      if (heuristic === 'euclidean') visualizeAstar(euclideanHeuristic);
      if (heuristic === 'manhattan') visualizeAstar(manhattanHeuristic);
      if (heuristic === 'octile') visualizeAstar(octileHeuristic);
      if (heuristic === 'chebyshev') visualizeAstar(chebyshevHeuristic);
    }
  }

  nonHeuristicAlg(alg) {
    const { visualizeDijkstra } = this.props;

    if (alg === 'dijkstra') {
      visualizeDijkstra();
    }
  }

  nonHeuristicAlgs = ['dijkstra'];

  startAlg(alg, heuristic) {
    const { setIsSearchRunning } = this.props;
    setIsSearchRunning(true);
    if (this.nonHeuristicAlgs.includes(alg)) {
      this.nonHeuristicAlg(alg);
    } else {
      this.heuristicAlg(heuristic, alg);
    }
  }

  render() {
    const {
      algorithm,
      heuristic,
      fullReset,
      resetSearch,
      handleAlgChange,
      handleHeuristicChange,
      isSearchRunning,
      searchSpeed,
      setSearchSpeed,
      randomWalls,
      diagonalMovement,
      handleDiagChange,
      diagonalWeight,
      setDiagonalWeight,
      recursiveDivisionWalls,
      recursiveBacktrackingMaze
    } = this.props;

    return (
      <div className="optionBar">
        <div className="actions">
          <AlgOptions
            handleAlgChange={handleAlgChange}
            handleHeuristicChange={handleHeuristicChange}
            searchSpeed={searchSpeed}
            setSearchSpeed={setSearchSpeed}
            algorithm={algorithm}
            heuristic={heuristic}
            nonHeuristicAlgs={this.nonHeuristicAlgs}
          />
          <DiagonalOptions
            diagonalMovement={diagonalMovement}
            handleDiagChange={handleDiagChange}
            diagonalWeight={diagonalWeight}
            setDiagonalWeight={setDiagonalWeight}
          />
          <ObstacleButtons
            randomWalls={randomWalls}
            isSearchRunning={isSearchRunning}
            recursiveDivisionWalls={recursiveDivisionWalls}
            recursiveBacktrackingMaze={recursiveBacktrackingMaze}
          />
          <ResetButtons
            fullReset={fullReset}
            isSearchRunning={isSearchRunning}
            resetSearch={resetSearch}
          />
        </div>
        <br />
        <div className="visualizeWrapper">
          <button
            className="button is-primary is-fullwidth"
            onClick={() => this.startAlg(algorithm, heuristic)}
          >
            Visualize
          </button>
        </div>
      </div>
    );
  }
}
