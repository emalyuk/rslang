import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDeletedWords, updateStudiedWords,
  updateDifficultWords, updateTrash, toggleIsAllSelected, toggleIsSelect,
} from '../../pages/dictionary/DictionaryReducer';
import './DeleteModal.scss';

const DeleteModal = ({ hideFunc, tab }) => {
  const dispatch = useDispatch();
  const { deletedWords, difficultWords, studiedWords } = useSelector((state) => state.dictionary);
  const trashWords = useSelector((state) => state.dictionary.trash);

  const deleteWordsFromTrash = (section, copyWords) => {
    const copyTrash = trashWords.slice();
    const copyDeletedWords = deletedWords.slice();
    const newArr = [];
    const deleteIndex = [];
    copyWords.forEach((word, index) => {
      copyTrash.forEach((id) => {
        if (id === word.id) {
          deleteIndex.push(index);
        }
      })
    })

    for (let i = 0; i < copyWords.length; i += 1) {
      if (!deleteIndex.includes(i)) {
        newArr.push(copyWords[i]);
      } else {
        copyDeletedWords.push(copyWords[i]);
      }
    }

    switch (section) {
      case 'deletedWords':
        dispatch(updateDeletedWords(newArr));
        break;
      case 'studiedWords':
        dispatch(updateStudiedWords(newArr));
        dispatch(updateDeletedWords(copyDeletedWords));
        break;
      case 'difficultWords':
        dispatch(updateDifficultWords(newArr));
        dispatch(updateDeletedWords(copyDeletedWords));
        break;
    }

    dispatch(updateTrash([]));
    dispatch(toggleIsAllSelected(false));
    dispatch(toggleIsSelect(false));
  };

  const deleteWords = () => {
    let copySectionWords = [];
    switch (tab) {
      case 'deleted':
        copySectionWords = deletedWords.slice();
        deleteWordsFromTrash('deletedWords', copySectionWords);
        break;
      case 'studied':
        copySectionWords = studiedWords.slice();
        deleteWordsFromTrash('studiedWords', copySectionWords);
        break;
      case 'difficult':
        copySectionWords = difficultWords.slice();
        deleteWordsFromTrash('difficultWords', copySectionWords);
        break;
    }

    hideFunc();
  };

  const cancelDeleteModal = () => hideFunc();

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
              onClick={() => deleteWords()}
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

DeleteModal.propTypes = {
  hideFunc: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
};

export default DeleteModal;
