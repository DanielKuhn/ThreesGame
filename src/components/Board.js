import React from 'react';
import Square from './Square'

class Board extends React.Component {
  render() {
    /*
    // TODO:
    var squares = []
    for (let row = 0; row < this.props.settings.rows; row++) {
      //squares.push(<div className="board-row">);
      for (let col = 0; col < this.props.settings.cols; col++) {
        const i = this.props.settings.rows + this.props.settings.cols;
        squares.push(<Square key={`square-${i}`} value={this.props.squares[col]} />);
      }
      //squares.push(</div>);
    }
    */

    return (
      <div>
        <div className="board-row">
          <Square key={`square-1`} value={this.props.squares[0]} />
          <Square key={`square-2`} value={this.props.squares[1]} />
          <Square key={`square-3`} value={this.props.squares[2]} />
          <Square key={`square-4`} value={this.props.squares[3]} />
        </div>
        <div className="board-row">
          <Square key={`square-5`} value={this.props.squares[4]} />
          <Square key={`square-6`} value={this.props.squares[5]} />
          <Square key={`square-7`} value={this.props.squares[6]} />
          <Square key={`square-8`} value={this.props.squares[7]} />
        </div>
        <div className="board-row">
          <Square key={`square-9`} value={this.props.squares[8]} />
          <Square key={`square-10`} value={this.props.squares[9]} />
          <Square key={`square-11`} value={this.props.squares[10]} />
          <Square key={`square-12`} value={this.props.squares[11]} />
        </div>
        <div className="board-row">
          <Square key={`square-13`} value={this.props.squares[12]} />
          <Square key={`square-14`} value={this.props.squares[13]} />
          <Square key={`square-15`} value={this.props.squares[14]} />
          <Square key={`square-16`} value={this.props.squares[15]} />
        </div>
      </div>
    );
  }
}

export default Board;
