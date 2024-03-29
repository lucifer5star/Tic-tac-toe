import "./styles.scss";
import Board from "./components/Board";
import React, { useState } from "react";
import { calculateWinner } from "./components/Winner";
import StatusMessage from "./components/StatusMessage";
import History from "./components/History";

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }]
function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  // const [squares,setSquares]= useState(Array(9).fill(null));
  //   const [isXNext,setIsXNext] = useState(false);

  const {winner,winningSquares} = calculateWinner(gamingBoard.squares);
  // console.log({ history, currentMove });

  const handleSquareClick = (clickedPosition) => {
    // console.log(squares);
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }
    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? "X" : "0";
          }
          return squareValue;
        }
      );
      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquaresState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove((move) => move + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };

  const handleClick=()=>{
    setHistory(NEW_GAME);
    setCurrentMove(0);
  }
  

  return (
    <div className="app">
      <h1>TIC <span className="text-green">TAC</span> TOE</h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button onClick={handleClick} className={`btn-reset ${winner? 'active':''}`}>Start New Game</button>
      <h2 style={{
        fontWeight: 'normal'
      }}>Current Game History</h2>
      
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      
    </div>
  );
}

export default App;
