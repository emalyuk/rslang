import React from 'react';
import PropTypes from 'prop-types';

import { countCardsPerDayStep, numberOfOption } from 'constants/constants';
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
  const { cardMainInfo, cardExtraInfo } = settings.optional;

  const maxCardsArrayOfNumber = arrayOfNumbers(
    countCardsPerDayStep,
    numberOfOption,
  );

  const maxNewCardsArrayOfNumber = arrayOfNumbers(
    countCardsPerDayStep,
    Number(settings.wordsPerDay) / numberOfOption,
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
          settings={cardMainInfo}
          handleChange={handleOnChangeSwitcher}
        />

        <CardSettingsSwitcherBox
          title={settingsLabelName.cardExtraInfo.ru}
          categoryLabel={settingsLabelName.cardExtraInfo.en}
          settings={cardExtraInfo}
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

          {!cardExtraInfo.isOnlyNewWords && (
            <CardsCountSelect
              label={settingsLabelName.newWordsPerDay.ru}
              tag={settingsLabelName.newWordsPerDay.en}
              selectedOption={settings.optional.newWordsPerDay}
              arrayOfNumbers={maxNewCardsArrayOfNumber}
              handleChangeSelect={handleOnChangeSelect}
            />
          )}
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
