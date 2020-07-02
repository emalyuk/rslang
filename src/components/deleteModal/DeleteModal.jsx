import React from 'react';
import './DeleteModal.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateWords, updateDeletedWords, updateStudiedWords,
  updateDifficultWords, updateTrash, toggleIsAllSelected, toggleIsSelect,
} from '../../pages/dictionary/DictionaryReducer';

const DeleteModal = ({ hideFunc, tab }) => {
  const dispatch = useDispatch();
  const trashWords = useSelector((state) => state.dictionary.trash);
  const words = useSelector((state) => state.dictionary.words);
  const deletedWords = useSelector((state) => state.dictionary.deletedWords);
  const difficultWords = useSelector((state) => state.dictionary.difficultWords);
  const studiedWords = useSelector((state) => state.dictionary.studiedWords);

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
      case 'words':
        dispatch(updateWords(newArr));
        dispatch(updateDeletedWords(copyDeletedWords));
        break;
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
      default:
    }

    dispatch(updateTrash([]));
    dispatch(toggleIsAllSelected(false));
    dispatch(toggleIsSelect(false));
  };

  const deleteWords = () => {
    let copySectionWords = [];
    switch (tab) {
      case 'all':
        copySectionWords = words.slice();
        deleteWordsFromTrash('words', copySectionWords);
        break;
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
      default:
    }

    hideFunc();
  };

  const cancelDeleteModal = () => {
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
