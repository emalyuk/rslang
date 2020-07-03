import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getSettingsData, putSettingsData } from './HomeApi';
import { getHomeInfo } from './HomeSliceReducer';
import Loading from '../../components/loading/Loading';
import HomeStatus from './components/homeStatus/HomeStatus';
import CardSettings from './components/cardSettings/CardSettings';

import ROUTER from '../../routes';
import { responseStatusNotFound, responseStatusInvalidToken } from '../../constants/constants';
import { initialSettings, settingsLabelName } from '../../constants/cardSettingsData';

import './Home.scss';

export const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state) => state.home);

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function getSettings() {
      try {
        const receivedSettings = await getSettingsData();
        setSettings(receivedSettings);
      } catch (err) {
        // TODO: 401 Access token is missing or invalid
        console.log(err.response.status);
        if (err.response.status === responseStatusNotFound) {
          setSettings(initialSettings);
        } else {
          history.push('/404')
        }
      }
    }
    getSettings();
  }, []);

  useEffect(() => {
    console.log('updatePage');
  }, [settings]);

  // TODO: get server settings and stats data, useCallback, useMemo
  // MockData
  const wordsCountLearned = 555;

  console.log(settings);

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

  const handleOnClickStartButton = () => {
    const strSettings = JSON.stringify(settings);
    console.log(strSettings);
    putSettingsData(strSettings);
    // history.push(ROUTER.cards);
  };

  

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings])

  return (
    <div className='home'>
      {
        settings ? 
        <div className='home-container container'>
          <HomeStatus
            wordsCountLearned={wordsCountLearned}
            totalCardsPerDay={settings.wordsPerDay}
            handleClick={handleOnClickStartButton}
          />

          <CardSettings
            settings={settings}
            handleOnChangeSelect={handleOnChangeSelect}
            handleOnChangeSwitcher={handleOnChangeSwitcher}
          />
        </div>
        : <Loading />
      }
    </div>
  );
};

export default Home;
