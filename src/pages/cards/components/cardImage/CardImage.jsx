import React from 'react';
import PropTypes from 'prop-types';

import './CardImage.scss';

import { baseAssetsUrl } from '../../../../constants/constants';

const CardImage = ({ imgUrlEnding }) => {
  console.log('IMAGE UPDATE');
  return (
    <div className='card__main__image-container'>
      <img
        className='card__main__image'
        src={`${baseAssetsUrl}${imgUrlEnding}`}
        alt=''
      />
    </div>
  );
};

CardImage.propTypes = {
  imgUrlEnding: PropTypes.string.isRequired,
};

export default CardImage;
