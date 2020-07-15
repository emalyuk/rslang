import React from 'react';
import './ResultGame.scss';
import Word from './Word'

const ResultGame = ({ words, setWords, setIsFinish, setGameWordNum, init }) => {
  const wrongWords = words.filter(word => !word.isGuessed)
  const rightWords = words.filter(word => word.isGuessed)
  const newWords = words.sort(sortFunction)
  function sortFunction(a, b) {
    if (a.isGuessed < b.isGuessed) {
      return 1;
    }
    return -1;
  }
  const closeResult = () => {
    setIsFinish(false);
    setGameWordNum(0)
    words.map((item) => {
      item.isGuessed = false;
      item.isNotGuessed = false;
    })
  }
  return (
    <div className='ResultGame'>
      <div className='speakIt-modal'>
        <p className='modal-title'>Результаты:</p>
        <div className='close' onClick={closeResult}></div>
        <div className='rightWords'>
          <p className='words-title'>Правильно</p>
          {
            rightWords.map((item) => (
              <Word
                {...item}
                key={item.id}
              />
            ))
          }
        </div>
        <div className='wrongWords'>
          <p className='words-title'>Не правильно</p>
          {
            wrongWords.map((item) => (
              <Word
                {...item}
                key={item.id}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default ResultGame
