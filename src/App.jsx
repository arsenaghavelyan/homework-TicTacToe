import React, { useState } from 'react';
import './App.css';

const initialState = {
  board: Array(9).fill(''),
  currentPlayer: 'X',
  winner: null,
};

function App() {
  const [state, setState] = useState(initialState);

  const handleCellClick = (index) => {
    if (state.board[index] !== '' || state.winner) {
      return;
    }

    const newBoard = [...state.board];
    newBoard[index] = state.currentPlayer;

    setState({
      ...state,
      board: newBoard,
      currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    });

    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winCombinations) {
      const [a, b, c] = combination;

      if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        setState({
          ...state,
          winner: board[a],
        });
        return;
      }
    }
  };

  const resetGame = () => {
    setState(initialState);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {state.board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleCellClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      {state.winner && (
        <div className="winner">
          <h2>{state.winner} wins!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
