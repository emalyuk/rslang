import React, { useState } from 'react';

import {
  minLimitCardsPerDay,
  maxLimitCardsPerDay,
  minLimitNewCardsPerDay,
} from '../../../../constants/constants';
import arrayOfNumbers from '../../../../utils/arrayOfNumber';

import CardSettingsSwitcherBox from '../cardSettingsSwitcherBox';
import CardsCountSelect from '../cardsCountSelect';

import { initialSettings } from '../../../../constants/cardSettingsData';

import './CardSettings.scss';

const CardSettings = () => {
  const [settings, setSettings] = useState(initialSettings);

  const maxCardsArrayOfNumber = arrayOfNumbers(
    minLimitCardsPerDay,
    maxLimitCardsPerDay - minLimitCardsPerDay + 1,
  );

  const maxNewCardsArrayOfNumber = arrayOfNumbers(
    minLimitNewCardsPerDay, settings.cardsCount.maxCardsPerDay + 1,
  );

  const handleOnSelectChange = (event) => {
    const optionName = event.target.dataset.tag;
    const selectedValue = Number(event.target.value);

    if (optionName === 'maxCardsPerDay') {
      setSettings({
        ...settings,
        cardsCount: {
          maxCardsPerDay: selectedValue,
          newCardsPerDay: selectedValue,
        },
      });
    } else {
      setSettings({
        ...settings,
        cardsCount: {
          ...settings.cardsCount,
          newCardsPerDay: selectedValue,
        },
      });
    }
  }

  // TODO: useCallback, useMemo ? Check switch possibility

  const handleOnChangeSwitcher = (option, categoryLabel) => {
    const index = settings[categoryLabel].findIndex((el) => el.option === option);

    const oldItem = settings[categoryLabel][index];
    const newItem = {
      ...oldItem,
      isChecked: !oldItem.isChecked,
    };

    const newSettings = [
      ...settings[categoryLabel].slice(0, index),
      newItem,
      ...settings[categoryLabel].slice(index + 1),
    ];

    setSettings({
      ...settings,
      [categoryLabel]: newSettings,
    });
  }

  console.log(settings)

  return (
    <div className='home__settings home-box'>
      <h4 className='home__settings__title home-box-title'>Настройки</h4>
      <div className='home__settings__container'>

        <CardSettingsSwitcherBox
          title='Основные (одна из опций обязательна)'
          categoryLabel='mainInfoOnCard'
          settings={settings.mainInfoOnCard}
          handleChange={handleOnChangeSwitcher}
        />

        <CardSettingsSwitcherBox
          title='Дополнительные'
          categoryLabel='extraInfoOnCard'
          settings={settings.extraInfoOnCard}
          handleChange={handleOnChangeSwitcher}
        />

        <div className='home-box-inner'>
          <div className='home__settings__container--title'>
            Количество карточек
          </div>

          <CardsCountSelect
            label='Максимум в день'
            tag='maxCardsPerDay'
            selectedOption={settings.cardsCount.maxCardsPerDay}
            arrayOfNumbers={maxCardsArrayOfNumber}
            handleChangeSelect={handleOnSelectChange}
          />

          <CardsCountSelect
            label='Новых в день'
            tag='newCardsPerDay'
            selectedOption={settings.cardsCount.newCardsPerDay}
            arrayOfNumbers={maxNewCardsArrayOfNumber}
            handleChangeSelect={handleOnSelectChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
