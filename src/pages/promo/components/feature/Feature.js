import React from 'react';
import './Feature.scss';

export const Feature = ({ icon, title, description }) => {
  return (
    <div className='services-box'>
      <img src={icon} alt='services icon' />
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default Feature;
