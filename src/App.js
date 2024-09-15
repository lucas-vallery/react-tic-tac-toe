import { useState } from 'react';

function Square( { value, onSquareClick } ) {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

export default function Board() {

  const [gridValues, setGridValues] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick (i) {
    if (gridValues[i] || calculateWinner(gridValues)) {
      return;
    }

    const nextGridValues = gridValues.slice();

    if (xIsNext) {
      nextGridValues[i] = "X";
    } 
    else {
      nextGridValues[i] = "O";
    }

    setGridValues(nextGridValues);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(gridValues);
  let gameStatus;
  if(winner) {
    gameStatus = "Winner is " + winner;
  }
  else {
    gameStatus = "Next player is " + (xIsNext ? "X" : "O");
  }

    return (
      <>
        <div className='game-status'>{gameStatus}</div>
        <div className="board-row">
          <Square value={gridValues[0]} onSquareClick={() => handleClick(0)} />
          <Square value={gridValues[1]} onSquareClick={() => handleClick(1)} />
          <Square value={gridValues[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={gridValues[3]} onSquareClick={() => handleClick(3)} />
          <Square value={gridValues[4]} onSquareClick={() => handleClick(4)} />
          <Square value={gridValues[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={gridValues[6]} onSquareClick={() => handleClick(6)} />
          <Square value={gridValues[7]} onSquareClick={() => handleClick(7)} />
          <Square value={gridValues[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </>
    );
}

function calculateWinner (gridValues) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (gridValues[a] && (gridValues[a] == gridValues[b]) && (gridValues[b] == gridValues[c])) {
      return gridValues[a];
    }
  }

  return;
}
