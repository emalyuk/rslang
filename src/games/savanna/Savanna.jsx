import React, { useEffect, useState } from 'react';
import './Savanna.scss';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { getSavannaInfo, changeWordNumber, changeShowCloseModal, changeShowResultsModal, changeWords, changePlaySound, changeIsRefresh } from './SavannaReducer';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import StartModal from './modals/start/StartModal';
import CloseModal from './modals/close/CloseModal';
import ResultsModal from './modals/results/ResultsModal';

const Savanna = () => {
  const playSound = useSelector((state) => state.savanna.playSound);
  const [defaultPage, setDefaultPage] = useState(0);
  const showCloseModal = useSelector((state) => state.savanna.showCloseModal);
  const showResultsModal = useSelector((state) => state.savanna.showResultsModal);
  const isRefresh = useSelector((state) => state.savanna.isRefresh);
  const dispatch = useDispatch();
  const wordNumber = useSelector((state) => state.savanna.wordNumber);
  const words = useSelector((state) => state.savanna.words);
  const showStart = useSelector((state) => state.savanna.showStart)
  const [backgroundPosition, changeBackgroundPosition] = useState(0);
  const [rightWord, setRightWord] = useState([]);
  const [fails, setFails] = useState(0);
  const [results, setResults] = useState({
    valid: [],
    invalid: [],
  });
  const [hearts, setHearts] = useState([
    {
      id: 1,
      live: true,
    },
    {
      id: 2,
      live: true,
    },
    {
      id: 3,
      live: true,
    },
    {
      id: 4,
      live: true,
    },
    {
      id: 5,
      live: true,
    },
  ]);
  const [currentStage, setCurrentStage] = useState([]);

  const repeatAnimate = () => {
    const anime = document.getElementsByClassName('answer-true')[0];
    anime.setAttribute('data-state', 'end');
    if (wordNumber + 1 < words.length && fails < 5) {
      dispatch(changeWordNumber(wordNumber + 1));
    }
    setTimeout(() => {
      anime.setAttribute('data-state', 'start');
    }, 300);
  };

  const repeatAnimateAndFails = () => {
    if (fails < 5 && wordNumber + 1 < words.length) {
      if (playSound) {
        new Audio('https://raw.githubusercontent.com/himimetsu/rs-lang-data/master/error.mp3').play();
      }
      const copyRes = { ...results };
      copyRes.invalid.push(words[wordNumber]);
      setResults(copyRes);
    }
    const anime = document.getElementsByClassName('answer-true')[0];
    anime.setAttribute('data-state', 'end');
    if (wordNumber + 1 < words.length && fails < 5) {
      dispatch(changeWordNumber(wordNumber + 1));
    }
    if (fails < 5) {
      setTimeout(() => {
        anime.setAttribute('data-state', 'start');
      }, 300);
      setFails(fails + 1);
    }
  };

  const answerChoiceClickHandler = (answer) => {
    if (answer) {
      if (playSound) {
        new Audio('https://raw.githubusercontent.com/himimetsu/rs-lang-data/master/success.mp3').play();
      }
      changeBackgroundPosition(backgroundPosition + 3);
    } else {
      if (playSound) {
        new Audio('https://raw.githubusercontent.com/himimetsu/rs-lang-data/master/error.mp3').play();
      }
      setFails(fails + 1);
    }
    repeatAnimate();
  };

  const renderAnswerChoice = () => (
    currentStage.map((item, index) => (
      <span
        className='answer'
        data-answer={item.answer}
        key={item.id}
        data-id={index + 1}
        onClick={() => answerChoiceClickHandler(item.answer)}
      >
        {`${index + 1} ${item.translate}`}
      </span>
    ))
  );

  const renderHearts = () => (
    hearts.map((item, index) => (
      <div className='heart' data-live={hearts[index].live} key={hearts[index].id} />
    ))
  );

  const getWordsForStage = () => {
    const newStage = [];
    for (let i = wordNumber; i < wordNumber + 4; i += 1) {
      if (i === wordNumber) {
        setRightWord(words[wordNumber].word)
        newStage.push({
          ...words[i],
          answer: true,
        })
      } else if (words[i]) {
        newStage.push({
          ...words[i],
          answer: false,
        })
      } else {
        newStage.push({
          ...words[i - wordNumber],
          answer: false,
        })
      }
    }
    return newStage;
  };

  const shuffleArray = (paramArray) => {
    const arr = paramArray
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  const choose = (key) => {
    let answer;
    switch (key) {
      case '1':
        answer = document.querySelector(".answer[data-id='1']").getAttribute('data-answer');
        break;
      case '2':
        answer = document.querySelector(".answer[data-id='2']").getAttribute('data-answer');
        break;
      case '3':
        answer = document.querySelector(".answer[data-id='3']").getAttribute('data-answer');
        break;
      case '4':
        answer = document.querySelector(".answer[data-id='4']").getAttribute('data-answer');
        break;
      default:
    }

    if (answer === 'true') {
      const copyRes = { ...results };
      copyRes.valid.push(words[wordNumber]);
      setResults(copyRes);
      if (playSound) {
        new Audio('https://raw.githubusercontent.com/himimetsu/rs-lang-data/master/success.mp3').play();
      }
      changeBackgroundPosition(backgroundPosition + 3);
    } else if (answer === 'false') {
      const copyRes = { ...results };
      copyRes.invalid.push(words[wordNumber]);
      setResults(copyRes);
      if (playSound) {
        new Audio('https://raw.githubusercontent.com/himimetsu/rs-lang-data/master/error.mp3').play();
      }
      setFails(fails + 1);
    }

    repeatAnimate();

    if (fails < 5 && wordNumber + 1 < words.length) {
      if (wordNumber + 1 < words.length) {
        dispatch(changeWordNumber(wordNumber + 1));
      } else {
        dispatch(changeShowResultsModal(true));
      }
    }
  };

  const keyHandler = (event) => {
    const keyDown = event.key;
    if (keyDown === '1' || keyDown === '2' || keyDown === '3' || keyDown === '4') {
      choose(keyDown);
    }
  };

  const getNewDefaultWords = async () => {
    const response = await Axios.get(`https://afternoon-falls-25894.herokuapp.com/words?page=${defaultPage + 1}&group=0`);
    setDefaultPage(defaultPage + 1);
    const newWords = response.data.map((res) => {
      return {
        word: res.word,
        translate: res.wordTranslate,
        id: res.id,
        audio: res.audio,
      };
    });
    return newWords;
  };

  const updateGame = async () => {
    setResults({
      valid: [],
      invalid: [],
    });
    const anime = document.getElementsByClassName('answer-true')[0];
    anime.setAttribute('data-state', 'start');
    setHearts([
      {
        id: 1,
        live: true,
      },
      {
        id: 2,
        live: true,
      },
      {
        id: 3,
        live: true,
      },
      {
        id: 4,
        live: true,
      },
      {
        id: 5,
        live: true,
      },
    ]);
    setFails(0);
    const newWords = await getNewDefaultWords();
    dispatch(changeWords(newWords))
    dispatch(changeWordNumber(0));
    dispatch(changeIsRefresh(false));
  };

  useEffect(() => {
    if (!showStart) {
      const anime = document.getElementsByClassName('answer-true')[0];
      anime.setAttribute('data-state', 'start');
    }
  }, [showStart]);

  useEffect(() => {
    if (fails) {
      if (fails <= 5) {
        const copyHearts = { ...hearts };
        copyHearts[fails - 1].live = false;
        if (fails === 5) {
          dispatch(changeShowResultsModal(true));
          const anime = document.getElementsByClassName('answer-true')[0];
          anime.setAttribute('data-state', 'end');
        }
      // setHearts(copyHearts);
      }
    }
  }, [fails]);

  useEffect(() => {
    if (wordNumber + 1 === words.length) {
      dispatch(changeShowResultsModal(true));
      const anime = document.getElementsByClassName('answer-true')[0];
      anime.setAttribute('data-state', 'end');
    }
  }, [wordNumber]);

  useEffect(() => {
    if (words.length && wordNumber < words.length && fails < 5) {
      const wordsForStage = getWordsForStage();
      const resultArray = shuffleArray(wordsForStage);
      setCurrentStage(resultArray);
    }
  }, [wordNumber, words]);

  useEffect(() => {
    dispatch(getSavannaInfo());
  }, []);

  useEffect(() => {
    if (isRefresh) {
      updateGame();
    }
  }, [isRefresh]);

  return (
    <div className='savanna-wrapper' style={{ backgroundPositionY: `calc(100% - ${backgroundPosition}%` }}>
      {showCloseModal ? <ModalWindow><CloseModal /></ModalWindow> : null}
      {showResultsModal ? <ModalWindow><ResultsModal results={results} /></ModalWindow> : null}
      {showStart ? <StartModal /> : null}
      {!showStart ? (
        <div className='savanna-game' onKeyDown={(event) => keyHandler(event)} tabIndex='0'>
          <div className='answer-choice'>
            {renderAnswerChoice()}
          </div>
          <div className='answer-wrapper'>
            <div
              className='answer-true'
              onTransitionEnd={() => repeatAnimateAndFails()}
            >
              <div className='answer-element'>
                {currentStage.length ? rightWord : null}
              </div>
            </div>
            <div className='savanna-ui'>
              <span className='close-game' onClick={() => dispatch(changeShowCloseModal(true))} />
              <span
                className='toggle-sound'
                data-sound={playSound ? 'true' : 'false'}
                onClick={() => dispatch(changePlaySound(!playSound))}
              />
              <div className='hearts'>
                {renderHearts()}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Savanna;
