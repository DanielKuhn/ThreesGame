import React from 'react';
import Square from './Square'

class BoardRow extends React.Component {
  render() {
    const row = this.props.row;
    const cols = this.props.cols;
    const squares = [];
    for (let i=0; i < cols; i++) {
      const squareIndex = row * cols + i
      squares.push(<Square key={`square-${squareIndex}`}
                           value={this.props.squares[squareIndex]} />);
    }

    return (
      <div className="board-row">
        {squares}
      </div>
    )
  }
}

export default BoardRow;