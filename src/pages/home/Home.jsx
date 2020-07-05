import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from 'components/loading/Loading';
import { settingsLabelName } from 'constants/cardSettings';
import isPossibilitySwitch from 'utils/isPossibilitySwitch';
import { getSettings, putSettings } from './HomeApi';
import HomeStatus from './components/homeStatus/HomeStatus';
import CardSettings from './components/cardSettings/CardSettings';

import './Home.scss';

export const Home = () => {
  const history = useHistory();

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function getSettingsData() {
      const data = await getSettings();

      if (data) {
        setSettings(data);
      } else {
        history.push('/404');
      }
    }

    getSettingsData();
  }, [history]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    if (settings) {
      const timeout = setTimeout(() => {
        putSettings(JSON.stringify(settings));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [settings]);

  // TODO: get server stats data, useCallback, useMemo
  // MockData
  const wordsCountLearned = 555;

  const handleOnChangeSelect = (event, tag) => {
    const selectedValue = Number(event.target.value);

    const newSettings = {
      ...settings,
      optional: {
        ...settings.optional,
        newWordsPerDay: selectedValue,
      },
    };

    if (tag === settingsLabelName.maxWordsPerDay.en) {
      setSettings({
        ...newSettings,
        wordsPerDay: selectedValue,
      });
    } else {
      setSettings(newSettings);
    }
  };

  const handleOnChangeSwitcher = (option, categoryLabel) => {
    const oldValue = settings.optional[categoryLabel][option];

    if (categoryLabel === settingsLabelName.cardMainInfo.en) {
      if (!isPossibilitySwitch(settings.optional.cardMainInfo, option)) {
        return false;
      }
    }

    setSettings({
      ...settings,
      optional: {
        ...settings.optional,
        [categoryLabel]: {
          ...settings.optional[categoryLabel],
          [option]: !oldValue,
        },
      },
    });
  };

  return (
    <div className='home'>
      <div className='home-container container'>
        {settings ? (
          <>
            <HomeStatus
              wordsCountLearned={wordsCountLearned}
              totalCardsPerDay={settings.wordsPerDay}
            />

            <CardSettings
              settings={settings}
              handleOnChangeSelect={handleOnChangeSelect}
              handleOnChangeSwitcher={handleOnChangeSwitcher}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Home;
