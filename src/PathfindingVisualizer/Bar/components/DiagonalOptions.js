import React from 'react';

export default function DiagonalOptions({
    diagonalMovement,
    handleDiagChange,
    diagonalWeight,
    setDiagonalWeight
}) {
  return (
    <div className="diagProperties">
      <h5 className="title is-6">Diagonal</h5>
      <label htmlFor="chooseDiagType">Type:</label>
      <select
        name="chooseDiagType"
        id="chooseDiagType"
        value={diagonalMovement}
        onChange={e => handleDiagChange(e.target.value)}
      >
        <option value="never">Never</option>
        <option value="always">Always</option>
        <option value="onlyWhenNoObstacles">No Adjacent Walls</option>
        <option value="ifAtMostOneObstacle">One Adjacent Wall</option>
      </select>

      <br />

      <label htmlFor="chooseDiagWeight">Weight:</label>
      <select
        name="chooseDiagWeight"
        id="chooseDiagWeight"
        value={diagonalWeight}
        onChange={e => setDiagonalWeight(e.target.value)}
      >
        <option value="1">1</option>
        <option value="root2">Sqrt(2)</option>
      </select>
    </div>
  );
}
