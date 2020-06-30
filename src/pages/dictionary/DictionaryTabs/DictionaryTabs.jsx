import React, { useEffect } from 'react';
import './DictionaryTabs.scss';
import { useSelector, useDispatch } from 'react-redux';
import DictionaryWord from './DictionaryWord/DictionaryWord';
import DeleteModal from '../../../components/deleteModal/DeleteModal';
import ModalWindow from '../../../components/modalWindow/ModalWindow';
import { changeShowDeleteModal, updateTrash, toggleIsSelect } from '../DictionaryReducer';

const DictionaryTabs = ({ words, currentTab, difficultWords, studiedWords, deletedWords }) => {
  const showDeleteModal = useSelector((state) => state.dictionary.showDeleteModal);
  const isAllSelected = useSelector((state) => state.dictionary.isAllSelected);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAllSelected) {
      const copyIdWords = words.map((item) => item.id);
      dispatch(updateTrash(copyIdWords));
      dispatch(toggleIsSelect(true));
    } else {
      dispatch(updateTrash([]));
      dispatch(toggleIsSelect(false));
    }
  }, [isAllSelected]);

  return (
    <div className='dictionary-tabs-wrapper'>
      {showDeleteModal && <ModalWindow><DeleteModal tab={currentTab} hideFunc={() => dispatch(changeShowDeleteModal(false))} /></ModalWindow>}
      {currentTab === 'all' && (
        <div className='dictionary-all'>
          {words && words.map((word) => (
            <DictionaryWord {...word} key={word.id} isAll={isAllSelected} />
          ))}
        </div>
      )}
      {currentTab === 'studied' && (
        <div className='dictionary-studied'>
          {studiedWords && studiedWords.map((studiedWord) => (
            <DictionaryWord {...studiedWord} key={studiedWord.id} isAll={isAllSelected} />
          ))}
        </div>
      )}
      {currentTab === 'difficult' && (
        <div className='dictionary-difficult'>
          {difficultWords && difficultWords.map((difficultWord) => (
            <DictionaryWord {...difficultWord} key={difficultWord.id} isAll={isAllSelected} />
          ))}
        </div>
      )}
      {currentTab === 'deleted' && (
        <div className='dictionary-deleted'>
          {deletedWords && deletedWords.map((deletedWord) => (
            <DictionaryWord {...deletedWord} key={deletedWord.id} isAll={isAllSelected} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DictionaryTabs;
