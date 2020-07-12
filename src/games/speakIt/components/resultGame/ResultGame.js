import React from 'react';
import './ResultGame.scss';
import Word from './Word'

const ResultGame = ({ words, setIsFinish, init }) => {
  const newWords = words.sort(sortFunction)
  function sortFunction(a, b) {
    if (a.isGuessed < b.isGuessed) {
      return 1;
    }
    return -1;
  }
  const closeResult = () => {
    setIsFinish(false);
    window.location.reload()
  }
  return (
    <div className='ResultGame'>
      <div className='speakIt-modal'>
        <div className='close' onClick={closeResult}></div>
        {
          newWords.map((item) => (
            <Word
              {...item}
              key={item.id}
            />
          ))
        }
      </div>
    </div>
  )
}
export default ResultGame
