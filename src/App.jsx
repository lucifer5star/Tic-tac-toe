import './styles.scss';
import Board from './components/Board';
import React, { useState } from 'react';
import { calculateWinner } from './components/Winner';
import StatusMessage from './components/StatusMessage';

function App() {
  const [squares,setSquares]= useState(Array(9).fill(null));
    const [isXNext,setIsXNext] = useState(false);
    
    const winner= calculateWinner(squares);
    

    const handleSquareClick=(clickedPosition)=>{
      // console.log(squares);
      if(squares[clickedPosition] || winner){
          return;
      }
      setSquares((currentSquares)=>{
          return currentSquares.map((squareValue,position)=>{
              if(clickedPosition===position){
                  return isXNext ? 'X' : '0';
              }
              return squareValue;
          })
      })
      setIsXNext((currentIsXNext)=> !currentIsXNext)
  }
  
  return (
    <div className='app'>
      {/* <h2>{statusMessage}</h2> */}
      <StatusMessage winner={winner} isXNext={isXNext} squares={squares}/>
      <Board squares={squares} handleSquareClick={handleSquareClick}/>
    </div>
  );
}

export default App;
