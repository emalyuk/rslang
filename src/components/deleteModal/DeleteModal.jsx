import React from 'react';
import './DeleteModal.scss';
import PropTypes from 'prop-types';

const DeleteModal = ({ hideFunc }) => {
  const deleteWord = () => {
    console.log('Слова удалены');
    hideFunc();
  };

  const clearTrashWords = () => {
    console.log('Отмена');
    hideFunc();
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
              type='button'
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
              type='button'
              onClick={() => clearTrashWords()}
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

DeleteModal.propTypes = {
  hideFunc: PropTypes.func.isRequired,
};

export default DeleteModal;
