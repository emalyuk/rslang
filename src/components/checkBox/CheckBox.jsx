import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CheckBox.scss';

const CheckBox = ({ id, onClick, isChecked }) => {
  const boxRef = useRef();
  const iconRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const toggleCheckBox = () => {
    if (isActive) {
      boxRef.current.dataset.active = 'false';
      iconRef.current.dataset.active = 'false';
      setIsActive(false);
      onClick(id);
    } else {
      boxRef.current.dataset.active = 'true';
      iconRef.current.dataset.active = 'true';
      setIsActive(true);
      onClick(id);
    }
  };

  useEffect(() => {
    if (isChecked) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isChecked]);

  return (
    <div className='checkbox-wrapper'>
      <div className='checkbox'>
        <label htmlFor={id} className='checkbox_label'>
          <input className='checkbox_input' type='checkbox' id={id} />
          <span
            className='checkbox_box'
            ref={boxRef}
            data-active={isChecked ? 'true' : 'false'}
            onClick={() => toggleCheckBox()}
          />
          <span
            className='checkbox_icon'
            ref={iconRef}
            data-active={isChecked ? 'true' : 'false'}
            onClick={() => toggleCheckBox()}
          />
        </label>
      </div>
    </div>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default CheckBox;
