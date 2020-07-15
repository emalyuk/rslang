import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShowStart, changeDifficulity, changePage } from '../../SavannaReducer';
import './StartModal.scss';

const StartModal = () => {
  const dispatch = useDispatch();
  const { showChangeDifficulity } = useSelector((state) => state.savanna);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const start = () => dispatch(changeShowStart(false));

  const renderRounds = () => {
    const rounds = []
    for (let i = 0; i < 30; i += 1) {
      rounds.push(
        <div
          className='dif-round'
          data-active={i === currentPage ? 'true' : 'false'}
          onClick={() => {
            setCurrentPage(i);
            dispatch(changePage(i));
          }}
          key={i}
        >
          <div className='dif-round-content'>
            {i + 1}
          </div>
        </div>,
      );
    }
    return rounds;
  };

  return (
    <div className='start-wrapper'>
      <div className='start-window'>
        <div className='start-title'>
          САВАННА
        </div>
        <div className='start-description'>
          Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.
        </div>
        {
          showChangeDifficulity && (
            <div className='difficulity'>
              <h1 className='title-level'>Выберите сложность игры</h1>
              <div className='dif-levels'>
                <div
                  className='dif-level'
                  onClick={() => {
                    dispatch(changeDifficulity(0));
                    setCurrentLevel(0);
                  }}
                  data-active={currentLevel === 0 ? 'true' : 'false'}
                >
                  <div className='dif-level-content'>1</div>
                </div>
                <div
                  className='dif-level'
                  onClick={() => {
                    dispatch(changeDifficulity(1));
                    setCurrentLevel(1);
                  }}
                  data-active={currentLevel === 1 ? 'true' : 'false'}
                >
                  <div className='dif-level-content'>2</div>
                </div>
                <div
                  className='dif-level'
                  onClick={() => {
                    dispatch(changeDifficulity(2));
                    setCurrentLevel(2);
                  }}
                  data-active={currentLevel === 2 ? 'true' : 'false'}
                >
                  <div className='dif-level-content'>3</div>
                </div>
                <div
                  className='dif-level'
                  onClick={() => {
                    dispatch(changeDifficulity(3));
                    setCurrentLevel(3);
                  }}
                  data-active={currentLevel === 3 ? 'true' : 'false'}
                >
                  <div className='dif-level-content'>4</div>
                </div>
                <div
                  className='dif-level'
                  onClick={() => {
                    dispatch(changeDifficulity(4));
                    setCurrentLevel(4);
                  }}
                  data-active={currentLevel === 4 ? 'true' : 'false'}
                >
                  <div className='dif-level-content'>5</div>
                </div>
                <div
                  className='dif-level'
                  onClick={() => {
                    dispatch(changeDifficulity(5));
                    setCurrentLevel(5);
                  }}
                  data-active={currentLevel === 5 ? 'true' : 'false'}
                >
                  <div className='dif-level-content'>6</div>
                </div>
              </div>
              <h1 className='title-round'>Выберите раунд</h1>
              <div className='dif-rounds'>
                {renderRounds()}
              </div>
            </div>
          )
        }
        <div className='start-button'>
          <button
            onClick={() => start()}
            type='button'
          >
            Начать
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartModal;
