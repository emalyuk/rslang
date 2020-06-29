import React from 'react';

import SettingSwitcher from '../settingSwitcher';

import {
  primaryCardSettings,
  secondaryCardSettings,
} from '../../../../constants/cardSettingsData';

import './CardSettings.scss';

const CardSettings = () => {
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
          <div className='settings__select__container'>
            <div className='select__label'>Максимум в день:</div>
            <select className='custom-select custom-select-sm settings__select'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
          </div>

          <div className='settings__select__container'>
            <div className='select__label'>Новых в день:</div>
            <select className='custom-select custom-select-sm settings__select'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>99</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
