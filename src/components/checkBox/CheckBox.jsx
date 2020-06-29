import React, { useState, useRef, useEffect } from 'react';
import './CheckBox.scss';
import PropTypes from 'prop-types';

const CheckBox = ({ id, click, isAll }) => {
  const boxRef = useRef();
  const iconRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const toggleCheckBox = () => {
    if (isActive) {
      boxRef.current.dataset.active = 'false';
      iconRef.current.dataset.active = 'false';
      setIsActive(false);
      click(id);
    } else {
      boxRef.current.dataset.active = 'true';
      iconRef.current.dataset.active = 'true';
      setIsActive(true);
      click(id);
    }
  };

  useEffect(() => {
    if (isAll) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isAll]);

  return (
    <div className='checkbox-wrapper'>
      <div className='checkbox'>
        <label htmlFor={id} className='checkbox_label'>
          <input className='checkbox_input' type='checkbox' id={id} />
          <span
            className='checkbox_box'
            ref={boxRef}
            data-active={isAll ? 'true' : 'false'}
            onClick={() => toggleCheckBox()}
          />
          <span
            className='checkbox_icon'
            ref={iconRef}
            data-active={isAll ? 'true' : 'false'}
            onClick={() => toggleCheckBox()}
          />
        </label>
      </div>
    </div>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
  isAll: PropTypes.bool.isRequired,
};

export default CheckBox;
