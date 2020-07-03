import React from 'react';
import PropTypes from 'prop-types';

import './CardsCountSelect.scss';

const CardsCountSelect = ({
  label, arrayOfNumbers,
  handleChangeSelect, tag,
  selectedOption,
}) => {
  return (
    <div className='settings__select__container'>
      <div className='select__label'>{`${label}:`}</div>
      <select
        className='custom-select custom-select-sm settings__select'
        value={selectedOption}
        onChange={(event) => handleChangeSelect(event, tag)}
        onBlur={() => { }}
      >
        {
          arrayOfNumbers.map((number, index) => {
            return (
              <option
                value={number}
                key={`${index.toString()}`}
              >
                {number}
              </option>
            );
          })
        }
      </select>
    </div>
  );
};

CardsCountSelect.propTypes = {
  label: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  arrayOfNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChangeSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.number.isRequired,
};

export default CardsCountSelect;
