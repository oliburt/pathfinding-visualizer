import React from 'react';

export default function ObstacleButtons({ isSearchRunning, randomWalls, recursiveDivisionWalls, recursiveBacktrackingMaze }) {
  return (
    <div className="obstacleButtons">
      <h5 className="title is-6">Obstacles</h5>

      <button
        className="button is-success is-small is-rounded"
        onClick={() => randomWalls()}
        disabled={isSearchRunning}
      >
        Random Walls
      </button>
      <br/>
      <button
        className="button is-success is-small is-rounded"
        onClick={() => recursiveDivisionWalls()}
        disabled={isSearchRunning}
      >
        Recursive Division Maze
      </button>
      <br/>
      <button
        className="button is-success is-small is-rounded"
        onClick={() => recursiveBacktrackingMaze()}
        disabled={isSearchRunning}
      >
        Recursive Backtracking Maze
      </button>
    </div>
  );
}
