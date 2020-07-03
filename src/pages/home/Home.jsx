import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeInfo } from './HomeSliceReducer';

import HomeStatus from './components/homeStatus/HomeStatus';
import CardSettings from './components/cardSettings/CardSettings';

import { initialSettings, settingsLabelName } from '../../constants/cardSettingsData';

import './Home.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state) => state.home);
  
  // TODO: get server info, useCallback, useMemo
  // MockData
  const wordsCountLearned = 555;

  const [settings, setSettings] = useState(initialSettings);

  const handleOnChangeSelect = (event, tag) => {
    const selectedValue = Number(event.target.value);

    if (tag === settingsLabelName.maxCardsPerDay.en) {
      setSettings({
        ...settings,
        optional: {
          ...settings.optional,
          newCardsPerDay: selectedValue,
        },
        wordsPerDay: selectedValue,
      });
    } else {
      setSettings({
        ...settings,
        optional: {
          ...settings.optional,
          newCardsPerDay: selectedValue,
        },
      });
    }
  }

  const handleOnChangeSwitcher = (option, categoryLabel) => {
    const index = settings.optional[categoryLabel].findIndex((el) => el.option === option);

    const oldItem = settings.optional[categoryLabel][index];
    const newItem = {
      ...oldItem,
      isChecked: !oldItem.isChecked,
    };

    const newSettings = [
      ...settings.optional[categoryLabel].slice(0, index),
      newItem,
      ...settings.optional[categoryLabel].slice(index + 1),
    ];

    if (categoryLabel === settingsLabelName.mainInfoOnCard.en) {
      if (newSettings.every((el) => !el.isChecked)) {
        return false;
      }
    }

    setSettings({
      ...settings,
      optional: {
        ...settings.optional,
        [categoryLabel]: newSettings,
      },
    });
  }

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    // return () => {
    //   cleanup
    // }
  }, [settings])

  useEffect(() => {
    dispatch(getHomeInfo());
  }, []);

  return (
    <div className='home'>
      <div className='home-container container'>
        <HomeStatus
          wordsCountLearned={wordsCountLearned}
          totalCardsPerDay={settings.wordsPerDay}
        />
        <CardSettings
          settings={settings}
          handleOnChangeSelect={handleOnChangeSelect}
          handleOnChangeSwitcher={handleOnChangeSwitcher}
        />
      </div>
    </div>
  );
};

export default Home;
