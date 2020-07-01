import React, { useState } from 'react';

import {
  minLimitCardsPerDay,
  maxLimitCardsPerDay,
  minLimitNewCardsPerDay,
} from '../../../../constants/constants';
import arrayOfNumbers from '../../../../utils/arrayOfNumber';

import SettingSwitcher from '../settingSwitcher';
import CardsCountSelect from '../cardsCountSelect';

import {
  primaryCardSettings,
  secondaryCardSettings,
} from '../../../../constants/cardSettingsData';

import './CardSettings.scss';

const CardSettings = () => {
  const initialSettings = {
    cardsCount: {
      maxCardsPerDay: 50,
      newCardsPerDay: 50,
    },
  };

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
      setSettings((prevState) => ({
        ...prevState,
        cardsCount: {
          ...prevState.cardsCount,
          maxCardsPerDay: selectedValue,
          newCardsPerDay: selectedValue,
        },
      }));
    } else {
      setSettings((prevState) => ({
        ...prevState,
        cardsCount: {
          ...prevState.cardsCount,
          [optionName]: selectedValue,
        },
      }));
    }
  }

  console.log(settings)

  return (
    <div className='home__settings home-box'>
      <h4 className='home__settings__title home-box-title'>Настройки</h4>
      <div className='home__settings__container'>
        <div className='home-box-inner'>
          <div className='home__settings__container--title'>
            Основные (одна из опций обязательна)
          </div>
          {primaryCardSettings.map(({ label, option }) => {
            return (
              <SettingSwitcher label={label} option={option} key={option} />
            );
          })}
        </div>

        <div className='home-box-inner'>
          <div className='home__settings__container--title'>Дополнительные</div>
          {secondaryCardSettings.map(({ label, option }) => {
            return (
              <SettingSwitcher label={label} option={option} key={option} />
            );
          })}
        </div>

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
