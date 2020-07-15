import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DictionaryWord from './DictionaryWord/DictionaryWord';
import { DeleteModal, ModalWindow } from '../../../components'
import { changeShowDeleteModal, updateTrash, toggleIsSelect } from '../DictionaryReducer';
import './DictionaryTabs.scss';

const DictionaryTabs = ({ currentTab, difficultWords, studiedWords, deletedWords }) => {
  const showDeleteModal = useSelector((state) => state.dictionary.showDeleteModal);
  const isAllSelected = useSelector((state) => state.dictionary.isAllSelected);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAllSelected) {
      let copyIdWords;
      switch (currentTab) {
        case 'studied':
          copyIdWords = studiedWords.map((item) => item.id);
          break;
        case 'deleted':
          copyIdWords = deletedWords.map((item) => item.id);
          break;
        case 'difficult':
          copyIdWords = difficultWords.map((item) => item.id);
          break;
      }

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

      {currentTab === 'studied' && (
        <div className='dictionary-studied'>
          {studiedWords && studiedWords.map((studiedWord) => (
            <DictionaryWord {...studiedWord} key={studiedWord._id} isAll={isAllSelected} color='green' tab={currentTab} />
          ))}
        </div>
      )}

      {currentTab === 'difficult' && (
        <div className='dictionary-difficult'>
          {difficultWords && difficultWords.map((difficultWord) => (
            <DictionaryWord {...difficultWord} key={difficultWord._id} isAll={isAllSelected} color='orange' tab={currentTab} />
          ))}
        </div>
      )}

      {currentTab === 'deleted' && (
        <div className='dictionary-deleted'>
          {deletedWords && deletedWords.map((deletedWord) => (
            <DictionaryWord {...deletedWord} key={deletedWord._id} isAll={isAllSelected} color='red' tab={currentTab} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DictionaryTabs;
