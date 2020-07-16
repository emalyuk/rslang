import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getStats, putStats } from 'pages/home/HomeApi';
import { changeIsRefresh } from '../../SavannaReducer';
import './ResultsModal.scss';

const ResultsModal = ({ results }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wordsLength = useSelector((state) => state.savanna.words.length);
  const { isUserLoggedIn } = useSelector((state) => state.login);

  const playAudio = (src) => {
    const link = `https://raw.githubusercontent.com/himimetsu/rslang-data/master/${src}`;
    const audio = new Audio(link);
    audio.onload = audio.play();
  };

  const continueTrain = () => {
    dispatch(changeIsRefresh(true));
  };

  const [score, setScore] = useState(true);
  const renderInvalid = () => (
    results.invalid.map((inv) => (
      <div className='invalid' key={inv.id}>
        <div className='audio-icon' onClick={() => playAudio(inv.audio)} />
        <div className='invalid-word'>{inv.word}</div>
        <div className='tr'>   —   </div>
        <div className='invalid-translate'>{inv.translate}</div>
      </div>
    ))
  );

  const renderValid = () => (
    results.valid.map((val) => (
      <div className='valid' key={val.id}>
        <div className='audio-icon' onClick={() => playAudio(val.audio)} />
        <div className='valid-word'>{val.word}</div>
        <div className='tr'>   —   </div>
        <div className='valid-translate'>{val.translate}</div>
      </div>
    ))
  );

  const postStatistic = async () => {
    const stats = await getStats();

    const currentGameStats = {
      date: new Date().toLocaleDateString(),
      right: results.valid.length,
      wrong: results.invalid.length,
    };

    let newStats;

    if (stats.optional.savanna.statistics.length) {
      newStats = {
        ...stats,
        optional: {
          ...stats.optional,
          savanna: {
            statistics: [...stats.optional.savanna.statistics, currentGameStats],
          },
        },
      }
    } else {
      newStats = {
        ...stats,
        optional: {
          ...stats.optional,
          savanna: {
            statistics: [currentGameStats],
          },
        },
      };
    }

    putStats(newStats);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      if (results.valid.length || results.invalid.length) {
        postStatistic();
      }
    }
  }, [results]);

  return (
    <div className='results-wrapper'>
      <div className='results-window'>
        <div className='results-title'>
          Игра окончена
        </div>
        <div className='results-slider'>
          {score ? (
            <div className='results-score'>
              <div className='results-satiety'>
                <div className='satiety-description'>
                  <div className='procent'>
                    {100 / wordsLength * results.valid.length} %
                  </div>
                  <div className='text'>
                    Сытость <br/> Мурмура
                  </div>
                </div>
              </div>
              <div className='results-exp'>
                <div className='exp-icon' />
                <div className='exp-text'>
                  Опыт + {results.valid.length * 10}
                </div>
              </div>
            </div>
          ) : null}
          {!score ? (
            <div className='results-words'>
              <div className='results-invalid'>
                <div className='invalid-title'>
                  <span>ОШИБОК: </span>
                </div>
                {renderInvalid()}
              </div>
              <div className='results-line' />
              <div className='results-valid'>
                <div className='valid-title'>
                  <span>ЗНАЮ: </span>
                </div>
                {renderValid()}
              </div>
            </div>
          ) : null}
        </div>
        <div className='results-navigation'>
          <div
            className='first-slide'
            onClick={() => setScore(true)}
            data-active={score ? 'true' : 'false'}
          />
          <div
            className='second-slide'
            onClick={() => setScore(false)}
            data-active={!score ? 'true' : 'false'}
          />
        </div>
        <div className='results-btn'>
          <div className='continue-btn' onClick={() => continueTrain()}>
            <span>Продолжить тренировку</span>
          </div>
          <div className='list-btn' onClick={() => history.push('/game')}>
            <span>К списку тренировок</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
