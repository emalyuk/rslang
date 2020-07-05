import React from 'react';
import PropTypes from 'prop-types';

import {
  minLimitCardsPerDay,
  maxLimitCardsPerDay,
  minLimitNewCardsPerDay,
} from 'constants/constants';
import arrayOfNumbers from 'utils/arrayOfNumber';
import { settingsLabelName } from 'constants/cardSettings';

import CardSettingsSwitcherBox from '../cardSettingsSwitcherBox/CardSettingsSwitcherBox';
import CardsCountSelect from '../cardsCountSelect/CardsCountSelect';

import './CardSettings.scss';

const CardSettings = ({
  settings,
  handleOnChangeSelect,
  handleOnChangeSwitcher,
}) => {
  const maxCardsArrayOfNumber = arrayOfNumbers(
    minLimitCardsPerDay,
    maxLimitCardsPerDay - minLimitCardsPerDay + 1,
  );

  const maxNewCardsArrayOfNumber = arrayOfNumbers(
    minLimitNewCardsPerDay,
    Number(settings.wordsPerDay) + 1,
  );

  return (
    <div className='home__settings home-box'>
      <h4 className='home__settings__title home-box-title'>
        {settingsLabelName.settings}
      </h4>
      <div className='home__settings__container'>
        <CardSettingsSwitcherBox
          title={settingsLabelName.cardMainInfo.ru}
          categoryLabel={settingsLabelName.cardMainInfo.en}
          settings={settings.optional.cardMainInfo}
          handleChange={handleOnChangeSwitcher}
        />

        <CardSettingsSwitcherBox
          title={settingsLabelName.cardExtraInfo.ru}
          categoryLabel={settingsLabelName.cardExtraInfo.en}
          settings={settings.optional.cardExtraInfo}
          handleChange={handleOnChangeSwitcher}
        />

        <div className='home-box-inner'>
          <div className='home__settings__container--title'>
            {settingsLabelName.cardsNumber}
          </div>

          <CardsCountSelect
            label={settingsLabelName.maxWordsPerDay.ru}
            tag={settingsLabelName.maxWordsPerDay.en}
            selectedOption={settings.wordsPerDay}
            arrayOfNumbers={maxCardsArrayOfNumber}
            handleChangeSelect={handleOnChangeSelect}
          />

          <CardsCountSelect
            label={settingsLabelName.newWordsPerDay.ru}
            tag={settingsLabelName.newWordsPerDay.en}
            selectedOption={settings.optional.newWordsPerDay}
            arrayOfNumbers={maxNewCardsArrayOfNumber}
            handleChangeSelect={handleOnChangeSelect}
          />
        </div>
      </div>
    </div>
  );
};

CardSettings.propTypes = {
  handleOnChangeSelect: PropTypes.func.isRequired,
  handleOnChangeSwitcher: PropTypes.func.isRequired,
  settings: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    .isRequired,
};

export default CardSettings;
