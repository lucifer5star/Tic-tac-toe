import React from 'react'

const History = ({history,moveTo,currentMove}) => {
  return (
    <div className='history-wrapper'>
      <ul className='history'>
        {history.map((_,index)=> <li key={index}><button className={`btn-move ${currentMove === index ? 'active':''}`}  
        style={{ 
          fontWeight: currentMove===index?'bold':'normal'
        }}
        type="button" onClick={()=>moveTo(index)}>
          {index===0? "Go to game start": `Go to Move #${index}`}</button></li>)}
      </ul>
    </div>
  )
}

export default History
