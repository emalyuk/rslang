import React from 'react';
import './Service.scss';

export const Service = ({ icon, title, description }) => {
  return (
    <div className='services-box'>
      <img src={icon} alt='services icon' />
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default Service;
