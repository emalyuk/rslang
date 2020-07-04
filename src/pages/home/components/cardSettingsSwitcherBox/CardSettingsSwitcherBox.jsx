import React from 'react';
import PropTypes from 'prop-types';

import SettingSwitcher from '../settingSwitcher/SettingSwitcher';

import { labelsForSwitchers } from '../../../../constants/cardSettingsData';

import './CardSettingsSwitcherBox.scss';

const CardSettingsSwitcherBox = ({
  title, categoryLabel,
  settings, handleChange,
}) => {
  return (
    <div className='home-box-inner'>
      <div className='home__settings__container--title'>
        {title}
      </div>
      {
        Object.entries(settings).map((el) => {
          const option = el[0];
          const value = el[1];
          return (
            <SettingSwitcher
              label={labelsForSwitchers[option]}
              option={option}
              key={option}
              isChecked={value}
              handleChange={() => handleChange(option, categoryLabel)}
            />
          );
        })
      }
    </div>
  );
};

CardSettingsSwitcherBox.propTypes = {
  title: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  settings: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CardSettingsSwitcherBox;
