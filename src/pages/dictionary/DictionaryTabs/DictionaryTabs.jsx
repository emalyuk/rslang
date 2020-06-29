import React from 'react';
import './DictionaryTabs.scss';
import { useSelector, useDispatch } from 'react-redux';
import DictionaryWord from './DictionaryWord/DictionaryWord';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import ModalWindow from '../../../components/ModalWindow/ModalWindow';
import { changeShowDeleteModal, updateTrash, toggleIsSelect } from '../DictionaryReducer';
import { useEffect } from 'react';

const DictionaryTabs = ({ words, currentTab }) => {
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
      {showDeleteModal && <ModalWindow><DeleteModal hideFunc={() => dispatch(changeShowDeleteModal(false))} /></ModalWindow>}
      {currentTab === 'all' && (
        <div className='dictionary-all'>
          {words && words.map((word) => <DictionaryWord {...word} key={word.id} isAll={isAllSelected} />)}
        </div>
      )}
      {currentTab === 'studied' && (
        <div className='dictionary-studied'>
          {words && words.map((word) => <DictionaryWord {...word} key={word.id} isAll={isAllSelected} />)}
        </div>
      )}
      {currentTab === 'difficult' && (
        <div className='dictionary-difficult'>
          {words && words.map((word) => <DictionaryWord {...word} key={word.id} isAll={isAllSelected} />)}
        </div>
      )}
      {currentTab === 'deleted' && (
        <div className='dictionary-deleted'>
          {words && words.map((word) => <DictionaryWord {...word} key={word.id} isAll={isAllSelected} />)}
        </div>
      )}
    </div>
  );
};

export default DictionaryTabs;
