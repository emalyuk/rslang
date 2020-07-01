import React from 'react';
import PropTypes from 'prop-types';

import SettingSwitcher from '../settingSwitcher';

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
      {settings.map(({ label, option, isChecked }) => {
        return (
          <SettingSwitcher
            label={label}
            option={option}
            key={option}
            isChecked={isChecked}
            handleChange={() => handleChange(option, categoryLabel)}
          />
        );
      })}
    </div>
  );
};

CardSettingsSwitcherBox.propTypes = {
  title: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  settings: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CardSettingsSwitcherBox;
