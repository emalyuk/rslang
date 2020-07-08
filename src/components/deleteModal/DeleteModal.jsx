import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { putWord } from 'pages/home/HomeApi';
import { updateAllWords, updateTrash, changeIsLoadingWords } from '../../pages/dictionary/DictionaryReducer';
import './DeleteModal.scss';

const DeleteModal = ({ hideFunc, tab }) => {
  const dispatch = useDispatch();
  const { trash } = useSelector((state) => state.dictionary);

  const actionHandler = () => {
    const copyTrash = trash.slice();
    if (copyTrash.length) {
      dispatch(changeIsLoadingWords(true));
      let obj;
      if (tab === 'studied') {
        obj = {
          "difficulty": "deleted",
          "optional": {},
        }
      } else if (tab === 'difficult') {
        obj = {
          "difficulty": "weak",
          "optional": {},
        }
      } else if (tab === 'deleted') {
        obj = {
          "difficulty": "weak",
          "optional": {},
        }
      }

      const arr = copyTrash.map((word) => putWord(word, obj).then((res) => res));
      Promise.all(arr)
        .then(() => {
          dispatch(updateAllWords());
          dispatch(updateTrash([]));
          hideFunc();
        });
    }
  };

  const cancelDeleteModal = () => {
    hideFunc();
    dispatch(updateTrash([]));
  };

  return (
    <div className='delete-wrapper'>
      <div className='delete-window'>
        <div className='delete-title'>
          {tab === 'studied' && 'Вы точно хотите удалить это слово из вашего словаря?'}
          {tab === 'deleted' && 'Вы точно хотите восстановить это слово?'}
          {tab === 'difficult' && 'Вы точно хотите сделать это слово вновь изучаемыми?'}
        </div>
        <div className='delete-buttons'>
          <div className='btn-wrapper'>
            <button
              className='delete-btn'
              type='button'
              onClick={() => actionHandler()}
            >
              <span className='delete-btn-content'>
                {tab === 'studied' && 'Удалить слово'}
                {tab === 'deleted' && 'Восстановить слово'}
                {tab === 'difficult' && 'Сделать слово лёгким'}
              </span>
            </button>
          </div>
          <div className='btn-wrapper'>
            <button
              className='cancel-btn'
              type='button'
              onClick={() => cancelDeleteModal()}
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

// DeleteModal.propTypes = {
//   hideFunc: PropTypes.func.isRequired,
//   tab: PropTypes.string.isRequired,
// };

// export default DeleteModal;
