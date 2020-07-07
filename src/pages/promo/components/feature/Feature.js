import React from 'react';
import './Feature.scss';

export const Feature = ({ icon, title, description }) => {
  return (
    <div className='features-item'>
      <img src={icon} alt='feature icon' />
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default Feature;
