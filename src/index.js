import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick} 
      style={{color: props.color }}>
      {props.value}
    </button>
  );
}
function tryAdd(retArr, arr){
  for(var i=0; i<arr.length; i++)
    if(retArr.indexOf(arr[i]) === -1)
      retArr.push(arr[i]);
}

function PlayerHasWon(squares, player) {
  let ret = [];
  if(squares[0] === player && squares[1] === player && squares[2] === player) tryAdd(ret, [0,1,2]);
  if(squares[3] === player && squares[4] === player && squares[5] === player) tryAdd(ret, [3,4,5]);
  if(squares[6] === player && squares[7] === player && squares[8] === player) tryAdd(ret, [6,7,8]);
  if(squares[0] === player && squares[3] === player && squares[6] === player) tryAdd(ret, [0,3,6]);
  if(squares[1] === player && squares[4] === player && squares[7] === player) tryAdd(ret, [1,4,7]);
  if(squares[2] === player && squares[5] === player && squares[8] === player) tryAdd(ret, [2,5,8]);
  if(squares[0] === player && squares[4] === player && squares[8] === player) tryAdd(ret, [0,4,8]);
  if(squares[2] === player && squares[4] === player && squares[6] === player) tryAdd(ret, [2,4,6]);

  return ret;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null) };
    this.colors = Array(9).fill('black');
    this.players= ['X', 'O'];
    this.playerIndex = 0;
    this.isThereAWinner = false;
  }

  handleClick(i) {
    if(this.isThereAWinner || this.state.squares[i] !== null)
      return;

    const squares = this.state.squares.slice();
    squares[i] = this.players[this.playerIndex];
    this.setState({squares: squares});
    this.playerIndex = 1 - this.playerIndex;
  }

  renderSquare(i) {
    return  (
      <Square 
        index={i} 
        color={this.colors[i]}
        value={this.state.squares[i]}
        onClick={ () => this.handleClick(i)} />
      );
  }

  render() {
    let mark = this.players[1 - this.playerIndex];
    let status='';
    var result = PlayerHasWon(this.state.squares, mark);
    if(result.length > 0) {
      status = 'Player Won: ' + mark;
      this.isThereAWinner = true;
      for(var i=0; i<result.length; i++)
        this.colors[result[i]] = 'red';
    }
    else
      status = 'Next player: ' + this.players[this.playerIndex];

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
