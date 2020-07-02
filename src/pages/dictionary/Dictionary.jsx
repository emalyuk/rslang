import React, { useState, useEffect, useRef } from 'react';
import './Dictionary.scss';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '../../components/checkBox/CheckBox';
import LeoFaw from '../../components/leoFaw/LeoFaw';
import { updateWords, toggleIsAllSelected, changeShowDeleteModal, updateAllWords } from './DictionaryReducer';
import DictionaryTabs from './DictionaryTabs/DictionaryTabs';

const Dictonary = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const words = useSelector((state) => state.dictionary.words);
  const deletedWords = useSelector((state) => state.dictionary.deletedWords);
  const difficultWords = useSelector((state) => state.dictionary.difficultWords);
  const studiedWords = useSelector((state) => state.dictionary.studiedWords);
  const isAllSelected = useSelector((state) => state.dictionary.isAllSelected);
  const dispatch = useDispatch();
  const allTabRef = useRef();
  const studiedTabRef = useRef();
  const difficultTabRef = useRef();
  const deletedTabRef = useRef();
  const isSelect = useSelector((state) => state.dictionary.isSelect);
  const [tabs] = useState([
    { content: 'Все', tabName: allTabRef, id: 'all' },
    { content: <LeoFaw color='gray' />, tabName: studiedTabRef, id: 'studied' },
    { content: <LeoFaw color='orange' />, tabName: difficultTabRef, id: 'difficult' },
    { content: <LeoFaw color='green' />, tabName: deletedTabRef, id: 'deleted' },
  ]);

  const changeActiveOption = (value) => {
    if (allTabRef.current.dataset.select === 'true') {
      allTabRef.current.dataset.select = 'false';
    } else if (studiedTabRef.current.dataset.select === 'true') {
      studiedTabRef.current.dataset.select = 'false';
    } else if (difficultTabRef.current.dataset.select === 'true') {
      difficultTabRef.current.dataset.select = 'false';
    } else if (deletedTabRef.current.dataset.select === 'true') {
      deletedTabRef.current.dataset.select = 'false';
    }

    switch (value) {
      case 1:
        allTabRef.current.dataset.select = 'true';
        setCurrentTab('all');
        break;
      case 2:
        studiedTabRef.current.dataset.select = 'true';
        setCurrentTab('studied');
        break;
      case 3:
        difficultTabRef.current.dataset.select = 'true';
        setCurrentTab('difficult');
        break;
      case 4:
        deletedTabRef.current.dataset.select = 'true';
        setCurrentTab('deleted');
        break;
      default:
    }
  };

  const renderOptions = () => (
    tabs.map((tab, index) => (
      <div
        key={tab.id}
        ref={tab.tabName}
        className='toggle-option'
        data-select='false'
        onClick={() => changeActiveOption(index + 1)}
      >
        {tab.content}
      </div>
    ))
  );

  const allSelectedDictionary = () => {
    dispatch(toggleIsAllSelected(!isAllSelected));
  };

  useEffect(() => {
    if (isAllSelected) {
      const copyTrash = [];
      if (currentTab === 'all') {
        words.forEach((word) => copyTrash.push(word.id));
      } else if (currentTab === 'studied') {
        studiedWords.forEach((word) => copyTrash.push(word.id));
      } else if (currentTab === 'difficult') {
        difficultWords.forEach((word) => copyTrash.push(word.id));
      } else {
        deletedWords.forEach((word) => copyTrash.push(word.id));
      }
      dispatch(updateTrash(copyTrash));
    } else {
      dispatch(updateTrash([]));
    }
  }, [isAllSelected]);

  useEffect(() => {
    dispatch(updateAllWords());
  }, []);

  return (
    <div className='dictionary-wrapper'>
      <div className='dictionary-header'>
        <div className='dictionary-title'>
          {currentTab === 'all' && `Все слова (${words.length})`}
          {currentTab === 'studied' && `Изученные слова (${studiedWords.length})`}
          {currentTab === 'deleted' && `Удалённые слова (${deletedWords.length})`}
          {currentTab === 'difficult' && `Сложные слова (${difficultWords.length})`}
        </div>
        <div className='dictionary-header-buttons'>
          <div className='button-wrapper'>
            <button type='button'>Посмотреть все карточки</button>
          </div>
          <div className='button-wrapper'>
            <button type='button'>
              <span>
                Изучить слова
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className='dictionary-control'>
        <div className='check-all'>
          <CheckBox click={() => allSelectedDictionary()} id='allSelect' isAll={isAllSelected ? true : false} />
        </div>
        <div className='toggle-tabs'>
          {!isSelect && renderOptions()}
        </div>
        <div className='trash-icon' onClick={() => dispatch(changeShowDeleteModal(true))}></div>
      </div>
      <div className='dictionary-content'>
        <DictionaryTabs
          words={words}
          currentTab={currentTab}
          deletedWords={deletedWords}
          difficultWords={difficultWords}
          studiedWords={studiedWords}
        />
      </div>
    </div>
  );
};

export default Dictonary;
