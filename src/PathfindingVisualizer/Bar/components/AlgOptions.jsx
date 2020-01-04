import React from 'react';

export default function AlgOptions({
  searchSpeed,
  setSearchSpeed,
  algorithm,
  handleAlgChange,
  heuristic,
  handleHeuristicChange,
  nonHeuristicAlgs
}) {
  return (
    <div className="algProperties">
      <h5 className="title is-6">Options</h5>
      <label htmlFor="chooseAlg">Algorithm:</label>
      <select
        name="chooseAlg"
        id="chooseAlg"
        value={algorithm}
        onChange={e => handleAlgChange(e.target.value)}
      >
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">A*</option>
      </select>

      <br />

      <label htmlFor="chooseSpeed">Speed:</label>
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

      {!nonHeuristicAlgs.includes(algorithm) ? (
        <>
          <br />
          <label htmlFor="chooseHeuristic">Heuristic:</label>
          <select
            name="chooseHeuristic"
            id="chooseHeuristic"
            value={heuristic}
            onChange={e => handleHeuristicChange(e.target.value)}
          >
            <option value="manhattan">Manhattan</option>
            <option value="euclidean">Euclidean</option>
            <option value="octile">Octile</option>
            <option value="chebyshev">Chebyshev</option>
          </select>
        </>
      ) : null}
    </div>
  );
}
