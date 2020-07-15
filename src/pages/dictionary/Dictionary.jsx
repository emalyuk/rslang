import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putWord, postWord } from 'pages/home/HomeApi';
import { LeoFaw } from '../../components';
import { toggleIsAllSelected, updateAllWords, updateTrash, toggleIsSelect, changeIsLoadingWords } from './DictionaryReducer';
import DictionaryTabs from './DictionaryTabs/DictionaryTabs';
import './Dictionary.scss';
import { useHistory } from 'react-router-dom';

const Dictonary = () => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState('studied');
  const { isUserLoggedIn } = useSelector((state) => state.login);
  const { deletedWords, difficultWords, isAllSelected, studiedWords, trash, isLoadingWords } = useSelector((state) => state.dictionary);
  const dispatch = useDispatch();
  const studiedTabRef = useRef();
  const difficultTabRef = useRef();
  const deletedTabRef = useRef();
  const isSelect = useSelector((state) => state.dictionary.isSelect);
  const [tabs] = useState([
    { content: <LeoFaw color='green' />, tabName: studiedTabRef, id: 'studied' },
    { content: <LeoFaw color='orange' />, tabName: difficultTabRef, id: 'difficult' },
    { content: <LeoFaw color='red' />, tabName: deletedTabRef, id: 'deleted' },
  ]);

  const changeActiveOption = (value) => {
    if (studiedTabRef.current.dataset.select === 'true') {
      studiedTabRef.current.dataset.select = 'false';
    } else if (difficultTabRef.current.dataset.select === 'true') {
      difficultTabRef.current.dataset.select = 'false';
    } else if (deletedTabRef.current.dataset.select === 'true') {
      deletedTabRef.current.dataset.select = 'false';
    }

    switch (value) {
      case 1:
        studiedTabRef.current.dataset.select = 'true';
        setCurrentTab('studied');
        break;
      case 2:
        difficultTabRef.current.dataset.select = 'true';
        setCurrentTab('difficult');
        break;
      case 3:
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

  const dictionaryHandler = async () => {
    const copyTrash = trash.slice();
    if (copyTrash.length) {
      dispatch(changeIsLoadingWords(true));
      let obj;
      if (currentTab === 'studied') {
        obj = {
          "difficulty": "deleted",
          "optional": {},
        }
      } else if (currentTab === 'difficult') {
        obj = {
          "difficulty": "weak",
          "optional": {},
        }
      } else if (currentTab === 'deleted') {
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
        });
    }
  };

  useEffect(() => {
    dispatch(toggleIsSelect(false));
  }, [studiedWords, difficultWords, deletedWords]);

  useEffect(() => {
    if (isAllSelected) {
      const copyTrash = [];
      if (currentTab === 'studied') {
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
    if (isUserLoggedIn) {
      dispatch(changeIsLoadingWords(true));
      dispatch(updateAllWords());
    }
  }, []);

  return (
    <div className='dictionary-wrapper'>
      <div className='dictionary-header'>
        <div className='dictionary-title'>
          {currentTab === 'studied' && `Изученные слова (${studiedWords.length})`}
          {currentTab === 'deleted' && `Удалённые слова (${deletedWords.length})`}
          {currentTab === 'difficult' && `Сложные слова (${difficultWords.length})`}
        </div>
        <div className='dictionary-header-buttons'>
          <div className='button-wrapper'>
            <button type='button' onClick={() => history.push('/cards')}>Посмотреть все карточки</button>
          </div>
          <div className='button-wrapper'>
            <button type='button' onClick={() => history.push('/cards')}>
              <span>
                Изучить слова
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className='dictionary-control'>
        <div className='toggle-tabs'>
          {!isSelect && renderOptions()}
        </div>
      </div>
      <div className='dictionary-more-words'>
        <div className='dictionary-more-btn' onClick={() => dictionaryHandler()}>
          {currentTab === 'studied' && 'Удалить слова'}
          {currentTab === 'difficult' && 'Сделать слова лёгкими'}
          {currentTab === 'deleted' && 'Восстановить слова'}
        </div>
      </div>
      <div className='loading-words'>
        <div className='loading-words-content'>
          {isLoadingWords && 'Загрузка слов...'}
        </div>
      </div>
      <div className='dictionary-content'>
        <DictionaryTabs
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
