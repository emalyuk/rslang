import React from 'react';
import PropTypes from 'prop-types';

import './SettingSwitcher.scss';

const SettingSwitcher = ({ label, option }) => {
  return (
    <div className='custom-control custom-switch'>
      <input type='checkbox' className='custom-control-input' id={option} />
      <label className='custom-control-label setting-switcher' htmlFor={option}>
        {label}
      </label>
    </div>
  );
};

SettingSwitcher.propTypes = {
  label: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
};

export default SettingSwitcher;
