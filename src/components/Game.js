import React from 'react';
import Board from './Board'

import { randomFromCandidates } from '../helpers';

class Game extends React.Component {
  constructor() {
    super()
    this.reset = this.reset.bind(this)

    const gameSettings = {
      rows: 4,
      cols: 4
    }

    // getinitialState
    this.state = {
      settings: gameSettings,
      squares: []
    }
  }

  componentWillMount() {
    this.reset()
  }

  reset() {
    const noOfSquares = this.state.settings.rows * this.state.settings.cols
    const initialValues = []
    for (let i = 0; i < noOfSquares; i++) {
      initialValues.push(randomFromCandidates([0,1,2]))
    }

    this.setState({
      squares: initialValues
    })
  }

  handleKeyDown(e) {
    e.preventDefault();
    if (e.keyCode === 37) {
      this.updateBoard("left");
    } else if (e.keyCode === 38) {
      this.updateBoard("up");
    } else if (e.keyCode === 39) {
      this.updateBoard("right");
    } else if (e.keyCode === 40) {
      this.updateBoard("down");
    }
  }

  calcNewBoardState(squares, direction) {
    const cols = this.state.settings.cols
    const noOfSquares = Object.keys(squares).length
    for (let i = 0; i < noOfSquares; ++i) {
      const index = (direction === 'right' || direction === 'down') ? noOfSquares - i : i

      const currentValue = squares[index]

      // get comparison value and index depending on direction
      let comparisonIndex = 0;
      switch (direction) {
        case 'up':
          comparisonIndex = index+cols
          break
        case 'right':
          if (index % cols === 0) {
            // skip if leftmost column
            continue
          } else {
            comparisonIndex = index-1
          }
          break
        case 'down':
          comparisonIndex = index-cols
          break
        case 'left':
          if ((index + 1) % cols === 0) {
            // skip if rightmost column
            continue
          } else {
            comparisonIndex = index+1
          }
          break
        default:
          break
      }

      const comparisonValue = squares[comparisonIndex]

      // skip if comparison outside of board
      if (comparisonValue === undefined) {
        continue
      }

      if (comparisonValue === currentValue) {
        // if equal: add equal values at current index and remove comparison value
        squares[index] = currentValue * 2
        squares[comparisonIndex] = 0
      } else if (currentValue === 0) {
        // if current square is empty: move comparison to current
        squares[index] = comparisonValue
        squares[comparisonIndex] = 0
      }
    }
  }

  fillBoardWithRandomNewValue(squares, direction) {
    // fill up random field on the opposite side
    // first: determine empty squares
    const possibleOppositeRowIndexes = [];
    const noOfSquares = Object.keys(squares).length
    switch (direction) {
      case 'up':
        // lower row
        for (let i = noOfSquares - this.state.settings.cols; i < noOfSquares; i++) {
          possibleOppositeRowIndexes.push(i)
        }
        break
      case 'down':
        // upper row
        for (let i = 0; i < this.state.settings.rows; i++) {
          possibleOppositeRowIndexes.push(i)
        }
        break
      case 'right':
        // left col
        for (let i = 0; i < noOfSquares; i++) {
          if (i % this.state.settings.cols === 0) {
            possibleOppositeRowIndexes.push(i)
          }
        }
        break
      case 'left':
        // right col
        for (let i = 0; i < noOfSquares; i++) {
          if ((i+1) % this.state.settings.cols === 0) {
            possibleOppositeRowIndexes.push(i)
          }
        }
        break
      default:
        break
    }

    let oppositeRowIndexes = []
    possibleOppositeRowIndexes.forEach(function(n) {
      if (squares[n] === 0) {
        oppositeRowIndexes.push(n)
      }
    });

    // second: if an empty square exists: fill with 1 or 2
    squares[randomFromCandidates(oppositeRowIndexes)] = randomFromCandidates([1,2]);
  }

  updateBoard(direction) {
    // get copy of state (immutability)
    const squares = {...this.state.squares};
    this.calcNewBoardState(squares, direction);
    this.fillBoardWithRandomNewValue(squares, direction);

    this.setState({
      squares: squares
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board" onKeyDown={(event) => this.handleKeyDown(event)}>
          <Board settings={this.state.settings} squares={this.state.squares} />
          <button onClick={this.reset}>Neu Starten</button>
        </div>
      </div>
    );
  }
}

export default Game;