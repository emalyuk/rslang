import React, { useEffect, useState, useRef } from 'react';
import './Savanna.scss';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { getUserWordsWithFilter, getUserWords } from 'pages/home/HomeApi';
import { ModalWindow } from '../../components';
import { defaultHearts } from './data';
import { getSavannaInfo, changeWordNumber, changeShowCloseModal, changeShowResultsModal, changeWords, changePlaySound, changeIsRefresh, changeShowChangeDifficulity, changeUserWeakWords, changePage, resetState } from './SavannaReducer';
import StartModal from './modals/start/StartModal';
import CloseModal from './modals/close/CloseModal';
import ResultsModal from './modals/results/ResultsModal';
import shuffleArray from '../../utils/shuffleArray';

const Savanna = () => {
  const {
    playSound,
    showCloseModal,
    showResultsModal,
    isRefresh,
    wordNumber,
    showStart,
    words,
    userWeakWords,
    difficulity,
    page,
  } = useSelector((state) => state.savanna);
  const { isUserLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [answerRefs] = useState({
    0: useRef(),
    1: useRef(),
    2: useRef(),
    3: useRef(),
  });
  const answerTrueRef = useRef();
  const [backgroundPosition, changeBackgroundPosition] = useState(0);
  const [rightWord, setRightWord] = useState([]);
  const [fails, setFails] = useState(0);
  const [results, setResults] = useState({
    valid: [],
    invalid: [],
  });
  const [hearts, setHearts] = useState(defaultHearts);
  const [currentStage, setCurrentStage] = useState([]);

  const repeatAnimate = () => {
    answerTrueRef.current.dataset.state = 'end';
    if (wordNumber + 1 < words.length && fails < 5) {
      dispatch(changeWordNumber(wordNumber + 1));
    }
    setTimeout(() => {
      answerTrueRef.current.dataset.state = 'start';
    }, 300);
  };

  const updateHeartToDefault = () => {
    const copyDefaultHearts = [
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
    ];
    setHearts(copyDefaultHearts);
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
    answerTrueRef.current.dataset.state = 'end';
    if (wordNumber + 1 < words.length && fails < 5) {
      dispatch(changeWordNumber(wordNumber + 1));
    }
    if (fails < 5) {
      setTimeout(() => {
        answerTrueRef.current.dataset.state = 'start';
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
        ref={answerRefs[index]}
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

  const choose = (key) => {
    let answer;
    switch (key) {
      case 49:
        answer = answerRefs[0].current.dataset.answer;
        break;
      case 50:
        answer = answerRefs[1].current.dataset.answer;
        break;
      case 51:
        answer = answerRefs[2].current.dataset.answer;
        break;
      case 52:
        answer = answerRefs[3].current.dataset.answer;
        break;
      default:
    }

    if (fails < 5 && wordNumber + 1 < words.length) {
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
    const keyDown = event.keyCode;
    if (keyDown === 49 || keyDown === 50 || keyDown === 51 || keyDown === 52) {
      choose(keyDown);
    }
  };

  const getNewDefaultWords = async () => {
    if (userWeakWords > 19) {
      const response = await getUserWordsWithFilter('weak');
      const newWords = response.data[0].paginatedResults.map((res) => {
        return {
          word: res.word,
          translate: res.wordTranslate,
          id: res.id,
          audio: res.audio,
        };
      });
      return newWords;
    } else {
      const response = await Axios.get(`https://afternoon-falls-25894.herokuapp.com/words?page=${page + 1}&group=${difficulity}`);
      dispatch(changePage(page + 1));
      const newWords = response.data.map((res) => {
        return {
          word: res.word,
          translate: res.wordTranslate,
          id: res.id,
          audio: res.audio,
        };
      });
      return newWords;
    }
  };

  const updateGame = async () => {
    answerTrueRef.current.dataset.state = 'end';
    setResults({
      valid: [],
      invalid: [],
    });
    updateHeartToDefault();
    setFails(0);
    const newWords = await getNewDefaultWords();
    dispatch(changeWords(newWords));
    dispatch(changeWordNumber(0));
    dispatch(changeIsRefresh(false));
    dispatch(changeShowResultsModal(false));
    answerTrueRef.current.dataset.state = 'start';
  };

  const getUserWordsWrapper = async () => {
    if (isUserLoggedIn) {
      const studiedWords = await getUserWordsWithFilter('weak');
      dispatch(changeUserWeakWords(studiedWords.data[0].paginatedResults.length));
      if (studiedWords.data[0].paginatedResults.length > 19) {
        dispatch(getSavannaInfo(true));
      } else {
        dispatch(getSavannaInfo(false));
        dispatch(changeShowChangeDifficulity(true));
      }
    } else {
      dispatch(getSavannaInfo(false));
      dispatch(changeShowChangeDifficulity(true));
    }
  };

  useEffect(() => {
    if (!showStart) {
      answerTrueRef.current.dataset.state = 'start';
    }
  }, [showStart]);

  useEffect(() => {
    if (fails) {
      if (fails <= 5) {
        const copyHearts = { ...hearts };
        copyHearts[fails - 1].live = false;
        if (fails === 5) {
          dispatch(changeShowResultsModal(true));
          answerTrueRef.current.dataset.state = 'end';
        }
      }
    }
  }, [fails]);

  useEffect(() => {
    if (wordNumber + 1 === words.length) {
      dispatch(changeShowResultsModal(true));
      answerTrueRef.current.dataset.state = 'end';
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
    getUserWordsWrapper();
    updateHeartToDefault();

    return () => dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isRefresh) {
      updateGame();
    }
  }, [isRefresh]);

  return (
    <div className='savanna-wrapper' style={{ backgroundPositionY: `calc(100% - ${backgroundPosition}%` }}>
      {showCloseModal && <ModalWindow><CloseModal /></ModalWindow>}
      {showResultsModal && <ModalWindow><ResultsModal results={results} /></ModalWindow>}
      {showStart && <StartModal />}
      {!showStart && (
        <div className='savanna-game' onKeyDown={(event) => keyHandler(event)} tabIndex='0'>
          <div className='answer-choice'>
            {renderAnswerChoice()}
          </div>
          <div className='answer-wrapper'>
            <div
              ref={answerTrueRef}
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
      )}
    </div>
  );
};

export default Savanna;
