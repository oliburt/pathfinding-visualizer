import React from 'react';

export default function ObstacleButtons({ isSearchRunning, randomWalls }) {
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
      <br />
      {/* <button
        className="button is-success is-small is-rounded"
        onClick={() => {}}
        disabled={isSearchRunning}
      >
        Reset Search
      </button> */}
    </div>
  );
}
