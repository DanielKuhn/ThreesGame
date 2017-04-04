import React from 'react';
import BoardRow from './BoardRow'

class Board extends React.Component {

  render() {
    const rows = [];
    for (let i=0; i < this.props.settings.rows; i++) {
      rows.push(<BoardRow key={`row-${i}`}
                          row={i}
                          cols={this.props.settings.cols}
                          squares={this.props.squares} />);
    }

    return (
      <div>{rows}</div>
    )
  }
}

export default Board;
