import React from 'react';
import './DeleteModal.scss';
import { useDispatch } from 'react-redux';
import { changeShowDeleteModal } from '../../SavannaReducer';

const DeleteModal = () => {
  const dispatch = useDispatch();

  const deleteWord = () => {
    console.log('Слово удалено');
    dispatch(changeShowDeleteModal(false));
  };

  return (
    <div className='delete-wrapper'>
      <div className='delete-window'>
        <div className='delete-title'>
          Вы точно хотите удалить эти слова из вашего словаря?
        </div>
        <div className='delete-buttons'>
          <div className='btn-wrapper'>
            <button
              className='delete-btn'
              onClick={() => deleteWord()}
            >
              <span className='delete-btn-content'>
                Удалить слова
              </span>
            </button>
          </div>
          <div className='btn-wrapper'>
            <button
              className='cancel-btn'
              onClick={() => dispatch(changeShowDeleteModal(false))}
            >
              <span className='cancel-btn-content'>
                Отмена
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;