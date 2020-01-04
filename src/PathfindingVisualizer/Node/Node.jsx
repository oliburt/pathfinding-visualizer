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
      isStart,
      isFinish,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      theRef
    } = this.props;

    const finishBorder = {
      outline: '1px solid red',
      outlineOffset: '-2px'
    }

    const startBorder = {
      outline: '1px solid green',
      outlineOffset: '-2px'
    }
    
    return (
      <div
        ref={theRef}
        className={`node ${this.addedClass(this.props)}`}
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        style={isStart ? startBorder : isFinish ? finishBorder : null}
      ></div>
    );
  }
}
