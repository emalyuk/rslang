import React, { useEffect, useState } from 'react';

import { getWords } from './sprintApi';
import { GUESS_FROM_QUANTITY } from '../../../constants/constants';
import { getRandom } from './helpers';

import Button from '../../../components/button/Button';
import StartGameControls from './StartGameControls';

import Timer from './Timer.jsx';
import LevelSelect from './LevelSelect';

import './styles.scss';

const GameSprint = () => {
  //TODO: в редакс все если время будет (words - обязатьельн);
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayAndNewRaund, setIsPlayAndNewRaund] = useState(false);
  const [score, setScore] = useState(0);
  const [clickAnswerCounter, setClickAnswerCounter] = useState({
    correctAnswer: 0,
    unCorrectAnswer: 0,
  });

  const [arrayStatisticAllGames, setarrayStatisticAllGames] = useState([]);
  const [leavels, setLeavels] = useState(0);

  const newRound = (words) => {
    const gameRoundWords = getRandom(words, GUESS_FROM_QUANTITY);
    return gameRoundWords;
  };

  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState();
  const [combo, setCombo] = useState(0);

  const getNextWord = () => {
    if (words.length) {
      const roundWords = newRound(words);

      const enWord = roundWords[0].word;
      const ruWord = getRandom(roundWords, 1)[0].wordTranslate;

      setCurrentWord({ enWord, ruWord });
    }
  };

  const handlerToStart = async () => {
    function randomInteger(min, max) {
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    const group = leavels; // сложность
    const page = randomInteger(1, 30); // от 1...30 страниц

    const response = await getWords(group, page);

    setWords(response.data);
    setClickAnswerCounter({
      correctAnswer: 0,
      unCorrectAnswer: 0,
    });
    setScore(0);
    setIsPlayAndNewRaund(true);
    setIsPlay(!isPlay);
  };

  const isCurrentTranslateCorrect = () => {
    if (words.length) {
      const findWord = words.find((item) => {
        return item.word === currentWord.enWord;
      });

      if (findWord) {
        return findWord.wordTranslate === currentWord.ruWord;
      }
    }
  };

  const handlerLeavelChanche = (e) => {
    setLeavels(e.target.value);
  };

  const scorCounter = (answer) => {
    const isCorrectAnswer = isCurrentTranslateCorrect() === answer;

    let kkkkombo = 0;

    if (isCorrectAnswer) {
      setClickAnswerCounter({
        ...clickAnswerCounter,
        correctAnswer: clickAnswerCounter.correctAnswer + 1,
      });
      if (combo < 4) {
        kkkkombo = combo + 1;
      }
      if (combo === 4) {
        kkkkombo = combo;
      }
    } else {
      setClickAnswerCounter({
        ...clickAnswerCounter,
        unCorrectAnswer: clickAnswerCounter.unCorrectAnswer + 1,
      });
    }

    setCombo(kkkkombo);

    switch (kkkkombo) {
      case 1:
        setScore(score + 10);
        break;

      case 2:
        setScore(score + 20);
        break;

      case 3:
        setScore(score + 40);
        break;

      case 4:
        setScore(score + 80);
        break;

      default:
        break;
    }
  };

  const handleSelect = (isCorrect) => {
    scorCounter(isCorrect);
    getNextWord();
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'ArrowLeft') {
      handleSelect(false);
    }

    if (key === 'ArrowRight') {
      handleSelect(true);
    }
  };

  const UserControllerAnswer = () => {
    return (
      <div className='controllers'>
        <Button
          disabled={false}
          onClick={() => handleSelect(false)}
          className='uncorrect-button'
          type='button'
        >
          Не верно
        </Button>

        <Button
          disabled={false}
          onClick={() => handleSelect(true)}
          className='currect-button'
          type='button'
        >
          Верно
        </Button>
      </div>
    );
  };

  const RepeatGameControllers = () => {
    const currectAnswer = clickAnswerCounter.correctAnswer;
    const unCurrectAnswer = clickAnswerCounter.unCorrectAnswer;
    const allAnswer =
      clickAnswerCounter.correctAnswer + clickAnswerCounter.unCorrectAnswer;

    return (
      <div className='start-game-controller'>
        <div className='repeat-game-menu'>
          <Button
            disabled={false}
            onClick={handlerToStart}
            className='button-to-start'
            type='button'
          >
            Повторить
          </Button>

          <LevelSelect onSelect={handlerLeavelChanche} value={leavels} />
        </div>

        <div className='statistics'>
          <p>{`Всего: ${allAnswer}`}</p>
          <p>{`Правильные: ${currectAnswer}`}</p>
          <p>{`Не верно: ${unCurrectAnswer}`}</p>
          <p>
            {`Верных ответов:
            ${
              allAnswer !== 0
                ? Math.floor((currectAnswer / allAnswer) * 100)
                : 0
            }%`}
          </p>
        </div>
      </div>
    );
  };

  const renderControllersOnPlay = () => {
    if (isPlay) {
      return <UserControllerAnswer />;
    }
    return isPlayAndNewRaund ? (
      <RepeatGameControllers />
    ) : (
      <StartGameControls
        onStart={handlerToStart}
        onLeavelSelect={handlerLeavelChanche}
        leavels={leavels}
      />
    );
  };

  const handleTimeLeft = () => {
    setIsPlay(false);
    setarrayStatisticAllGames(
      arrayStatisticAllGames,
      arrayStatisticAllGames.push(clickAnswerCounter),
    );
    setCurrentWord();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  });

  useEffect(() => {
    getNextWord();
  }, [words]);

  return (
    <div className='game-sprint'>
      <h2 role='img' className='game-logo'>
        Sprint 🥵
      </h2>

      <div className='game-sprint__counetr'>
        <div className='counter-box'>{`Счет: ${score}`}</div>

        <div className='counter-box'>
          <Timer isTimerRun={isPlay} onTimeLeft={handleTimeLeft} />
        </div>
      </div>

      <div className='game-sprint__playground'>
        <div className='word-paly'>
          <div className='word-paly__words'>
            {currentWord && (
              <>
                <p>{currentWord.enWord}</p>
                <p>{currentWord.ruWord}</p>
              </>
            )}
          </div>
        </div>

        {renderControllersOnPlay()}
      </div>
    </div>
  );
};

export default GameSprint;
