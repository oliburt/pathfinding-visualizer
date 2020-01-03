import React, { Component } from 'react';

import './Bar.css';
import {
  euclideanHeuristic,
  manhattanHeuristic
} from '../../algorithms/helpers';
import ResetButtons from './components/ResetButtons';
import AlgOptions from './components/AlgOptions';

export default class Bar extends Component {
  heuristicAlg(heuristic, alg) {
    const { visualizeAstar } = this.props;

    if (alg === 'astar') {
      if (heuristic === 'euclidean') visualizeAstar(euclideanHeuristic);
      if (heuristic === 'manhattan') visualizeAstar(manhattanHeuristic);
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
      setSearchSpeed
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
          <ResetButtons
            fullReset={fullReset}
            isSearchRunning={isSearchRunning}
            resetSearch={resetSearch}
          />
        </div>
        <br />
        <button
          className="button is-primary is-medium is-rounded"
          onClick={() => this.startAlg(algorithm, heuristic)}
        >
          Visualize
        </button>
      </div>
    );
  }
}
