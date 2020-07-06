import React, { useEffect, useState } from 'react';
import './styles.scss';

import { getWords } from './sprintApi';
// import useKeyPress from './function';
import Button from '../../../components/button/Button';
import Timer from './timer';

const GameSprint = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isAnswer, setAnswer] = useState(false);

  const [word, setWord] = useState('');
  const [wordTranslate, setWordTranslate] = useState('');

  const points = 10;
  const someArr = [];

  const scorCounter = () => {
    if (isAnswer === true && combo !== 4) {
      setCombo(combo => combo + 1)
    }

    if (isAnswer === true && combo === 4) {
      setCombo(4)
    }

    if (isAnswer === false) {
      setCombo(0)
    }

    setScore(score => score + points * combo)
  }

  const upHandler = ({ key }) => {
    if (key === 'ArrowLeft') {
      scorCounter();
    }

    if (key === 'ArrowRight') {
      scorCounter();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  const handlerToStart = async (e) => {
    e.preventDefault();
    const group = 0; // сложность
    const page = 0; // от 1...30 страниц

    const response = await getWords(group, page);
    const wordsArray = response.data;

    wordsArray.map((item) => {
      return someArr.push([item.word, item.wordTranslate]);
    });

    const procents = 100;
    const n = someArr.length;
    const j = 25;
    const k = (n * j) / procents;
    const q = procents / j;

    console.log(k, q);

    // k - коофициент деления массива, (то число на которе я делю массив) k = (n * j) / 100
    // q = n / k (q - это сколько элеменов в массиве на основании процента)
    // n - общее кол-во слов,
    // j - % правильного слова в игре,

    // console.log(someArr)

    setWord(someArr[0][0]);
    setWordTranslate(someArr[0][1]);
  };

  return (
    <div className='game-sprint'>
      <div className='game-sprint__counetr'>{score}</div>
      <div className='game-sprint__playground'>
        <div role='img' className='game-logo'>
          Sprint 🥵
        </div>

        <div className='word-paly'>
          <div className='word-paly__english-word'>
            <span>{word}</span>
          </div>
          <div className='word-paly__russian-word'>
            <span>{wordTranslate}</span>
          </div>
        </div>

        <div className='controllers'>
          <Button
            disabled={false}
            onClick={scorCounter}
            className='uncorrect-button'
            type='button'
            children='Не верно'
          />
          <Button
            disabled={false}
            onClick={scorCounter}
            className='currect-button'
            type='button'
            children='Верно'
          />
        </div>

        <Timer className='timer' />
      </div>

      <div className='play-game-controller'>
        <Button
          disabled={false}
          onClick={handlerToStart}
          className='button-to-start'
          type='button'
          children='Начать'
        />
        <Button
          disabled={false}
          onClick={() => {}}
          className='button-to-speack'
          type='button'
          children='Звук'
        />
      </div>
    </div>
  );
};

export default GameSprint;

// Usage
// const GameSprint = () => {
//   // Call our hook for each key that we'd like to monitor
//   // const ArrowRight = useKeyPress('ArrowRight');
//   // const ArrowLeft = useKeyPress('ArrowLeft');

//   return (
//     <div>
//       <div>{'< >'}</div>
//       <div>
//         <button onKeyUp={ArrowRight}>right</button>
//         <button onKeyUp={ArrowLeft}>left</button>
//       </div>
//     </div>
//   );
// }

// Hook
// const useKeyPress = (targetKey) => {
//   const [keyPressed] = useState();

//   const upHandler = ({ key }) => {
//     if (key === targetKey) {
//       // что делаем
//       console.log('нажали на < или >');
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keyup', upHandler);
//     return () => {
//       window.removeEventListener('keyup', upHandler);
//     };
//   }, []);

//   return keyPressed;
// }

// export default GameSprint;
