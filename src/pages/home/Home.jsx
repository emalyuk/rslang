import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getSettings, putSettings } from './HomeApi';
// import { getHomeInfo } from './HomeSliceReducer';
import Loading from '../../components/loading/Loading';
import HomeStatus from './components/homeStatus/HomeStatus';
import CardSettings from './components/cardSettings/CardSettings';

import { settingsLabelName } from '../../constants/cardSettingsData';
import isPossibilitySwitch from '../../utils/isPossibilitySwitch';

import './Home.scss';

export const Home = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const { data, errors } = useSelector((state) => state.home);

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
      }, 3000)

      return () => clearTimeout(timeout);
    }
  }, [settings]);

  // TODO: get server stats data, useCallback, useMemo
  // MockData
  const wordsCountLearned = 555;

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
    const oldValue = settings.optional[categoryLabel][option];

    if (categoryLabel === settingsLabelName.mainInfoOnCard.en) {
      if (!isPossibilitySwitch(settings.optional.mainInfoOnCard, option)) {
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
  }

  return (
    <div className='home'>
      <div className='home-container container'>
        {
          settings
            ? (
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
            )
            : <Loading />
        }
      </div>
    </div>
  );
};

export default Home;
