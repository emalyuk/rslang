import React from 'react';
import './CloseModal.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeShowCloseModal } from '../../SavannaReducer';

const CloseModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className='close-wrapper'>
      <div className='close-header'>
        <div className='title'>
          <span>Тренировка не закончена!</span>
        </div>
      </div>
      <div className='close-body'>
        <div className='text'>
          <span>
            Если вы вернетесь к списку, ваши результаты не будут сохранены
          </span>
        </div>
      </div>
      <div className='close-footer'>
        <div className='close-btn'>
          <span onClick={() => history.push("/game")}>Закрыть</span>
        </div>
        <div className='cancel-btn' onClick={() => dispatch(changeShowCloseModal(false))}>
          <span>Отмена</span>
        </div>
      </div>
    </div>
  );
};

export default CloseModal;
