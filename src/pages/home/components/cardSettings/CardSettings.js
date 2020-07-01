import React, { useState, useEffect } from 'react';

import CardSettingsSwitcherBox from '../cardSettingsSwitcherBox';
import CardsCountSelect from '../cardsCountSelect';

import {
  minLimitCardsPerDay,
  maxLimitCardsPerDay,
  minLimitNewCardsPerDay,
} from '../../../../constants/constants';
import arrayOfNumbers from '../../../../utils/arrayOfNumber';
import { initialSettings, settingsLabelName } from '../../../../constants/cardSettingsData';

import './CardSettings.scss';

const CardSettings = () => {
  const [settings, setSettings] = useState(initialSettings);

  const maxCardsArrayOfNumber = arrayOfNumbers(
    minLimitCardsPerDay,
    maxLimitCardsPerDay - minLimitCardsPerDay + 1,
  );

  const maxNewCardsArrayOfNumber = arrayOfNumbers(
    minLimitNewCardsPerDay, settings.wordsPerDay + 1,
  );

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

  // TODO: useCallback, useMemo ? Check switch possibility
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

  return (
    <div className='home__settings home-box'>
      <h4 className='home__settings__title home-box-title'>
        {settingsLabelName.settings}
      </h4>
      <div className='home__settings__container'>

        <CardSettingsSwitcherBox
          title={settingsLabelName.mainInfoOnCard.ru}
          categoryLabel={settingsLabelName.mainInfoOnCard.en}
          settings={settings.optional.mainInfoOnCard}
          handleChange={handleOnChangeSwitcher}
        />

        <CardSettingsSwitcherBox
          title={settingsLabelName.extraInfoOnCard.ru}
          categoryLabel={settingsLabelName.extraInfoOnCard.en}
          settings={settings.optional.extraInfoOnCard}
          handleChange={handleOnChangeSwitcher}
        />

        <div className='home-box-inner'>
          <div className='home__settings__container--title'>
            {settingsLabelName.cardsNumber}
          </div>

          <CardsCountSelect
            label={settingsLabelName.maxCardsPerDay.ru}
            tag={settingsLabelName.maxCardsPerDay.en}
            selectedOption={settings.wordsPerDay}
            arrayOfNumbers={maxCardsArrayOfNumber}
            handleChangeSelect={handleOnChangeSelect}
          />

          <CardsCountSelect
            label={settingsLabelName.newCardsPerDay.ru}
            tag={settingsLabelName.newCardsPerDay.en}
            selectedOption={settings.optional.newCardsPerDay}
            arrayOfNumbers={maxNewCardsArrayOfNumber}
            handleChangeSelect={handleOnChangeSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
