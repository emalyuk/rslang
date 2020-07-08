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
