import React, { Component } from 'react';

import './Bar.css';
import {
  euclideanHeuristic,
  manhattanHeuristic
} from '../../algorithms/helpers';

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
    setIsSearchRunning(true)
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
      <div id="Bar">
        <button onClick={() => this.startAlg(algorithm, heuristic)}>
          Visualize
        </button>
        <label htmlFor="chooseSpeed">Choose Speed:</label>
        <select
          name="chooseSpeed"
          id="chooseSpeed"
          value={searchSpeed}
          onChange={e => setSearchSpeed(e.target.value)}
        >
          <option value="fast">Fast</option>
          <option value="average">Average</option>
          <option value="slow">Slow</option>
        </select>

        <label htmlFor="chooseAlg">Choose Algorithm:</label>
        <select
          name="chooseAlg"
          id="chooseAlg"
          value={algorithm}
          onChange={e => handleAlgChange(e.target.value)}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
        </select>

        {!this.nonHeuristicAlgs.includes(algorithm) ? (
          <>
            <label htmlFor="chooseHeuristic">Choose Heuristic:</label>
            <select
              name="chooseHeuristic"
              id="chooseHeuristic"
              value={heuristic}
              onChange={e => handleHeuristicChange(e.target.value)}
            >
              <option value="manhattan">Manhattan</option>
              <option value="euclidean">Euclidean</option>
            </select>
          </>
        ) : null}

        <button onClick={() => fullReset()} disabled={isSearchRunning}>Full Reset</button>
        <button onClick={() => resetSearch()} disabled={isSearchRunning}>Reset Search</button>
      </div>
    );
  }
}
