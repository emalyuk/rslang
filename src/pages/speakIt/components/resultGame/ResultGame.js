import React from 'react';
import './ResultGame.scss';
import Word from './Word'

const ResultGame = ({ words, setIsFinish }) => {
  function sortFunction(a, b) {
    if (a.isGuessed < b.isGuessed) {
      return 1;
    }
    return -1;
  }
  const newWords = words.sort(sortFunction)
  const closeResult = () => {
    setIsFinish(false)
  }
  return (
    <div className='ResultGame'>
      <div>
        {
          newWords.map((item) => (
            <Word
              {...item}
            />
          ))
        }
      </div>
    </div>
  )
}
export default ResultGame
