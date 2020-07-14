import React from 'react';
import './StartModal.scss';
import { useDispatch } from 'react-redux';
import { changeShowStart } from '../../SavannaReducer';

const StartModal = () => {
  const dispatch = useDispatch();
  const start = () => {
    dispatch(changeShowStart(false));
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
