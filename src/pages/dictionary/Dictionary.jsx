import React, { useState, useEffect, useRef } from 'react';
import './Dictionary.scss';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '../../components/CheckBox/CheckBox';
import LeoFaw from '../../components/LeoFaw/LeoFaw';
import { updateWords, toggleIsAllSelected } from './DictionaryReducer';
import DictionaryTabs from './DictionaryTabs/DictionaryTabs';

const Dictonary = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const words = useSelector((state) => state.dictionary.words);
  const isAllSelected = useSelector((state) => state.dictionary.isAllSelected)
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
    console.log('all selected');
    dispatch(toggleIsAllSelected(!isAllSelected));
  };

  useEffect(() => {
    dispatch(updateWords());
  }, []);

  return (
    <div className='dictionary-wrapper'>
      <div className='dictionary-header'>
        <div className='dictionary-title'>
          {words && `Мой словарь (${words.length})`}
        </div>
        <div className='dictionary-header-buttons'>
          <div className='button-wrapper'>
            <button type='button'>Посмотреть все карточки</button>
          </div>
          <div className='button-wrapper'>
            <button type='button'>Изучить слова</button>
          </div>
        </div>
      </div>
      <div className='dictionary-control'>
        <div className='check-all'>
          <CheckBox click={() => allSelectedDictionary()} />
        </div>
        <div className='toggle-tabs'>
          {!isSelect && renderOptions()}
        </div>
      </div>
      <div className='dictionary-content'>
        <DictionaryTabs words={words} currentTab={currentTab} />
      </div>
    </div>
  );
};

export default Dictonary;
