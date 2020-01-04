import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  addedClass = (props) => {
    if (props.isFinish) return 'node-finish'
    if (props.isStart) return 'node-start'
    if (props.isWall) return 'node-wall'
  }
  
  render() {
    const {
      col,
      row,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      theRef
    } = this.props;

    return (
      <div
        ref={theRef}
        className={`node ${this.addedClass(this.props)}`}
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
