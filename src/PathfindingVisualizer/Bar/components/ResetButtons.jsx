import React from 'react';

export default function ResetButtons({
  fullReset,
  isSearchRunning,
  resetSearch
}) {
  return (
    <div className="resetButtons">
      <h5 className="title is-6">Resets</h5>

      <button
        className="button is-warning is-small is-rounded"
        onClick={() => fullReset()}
        disabled={isSearchRunning}
      >
        Full Reset
      </button>
      <br />
      <button
        className="button is-warning is-small is-rounded"
        onClick={() => resetSearch()}
        disabled={isSearchRunning}
      >
        Reset Search
      </button>
    </div>
  );
}
