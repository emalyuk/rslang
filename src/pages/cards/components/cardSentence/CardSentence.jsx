import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import getFormattedSentence from 'utils/getFormattedSentence';

import './CardSentence.scss';

const CardMainSentence = ({ text }) => {
  const { currentCardAction } = useSelector((state) => state.cards);
  const { isCorrectAnswer, isSkippedWord } = currentCardAction;
  const { textArr, mainWord } = getFormattedSentence(text);

  return (
    <div className='card__main__sentence'>
      {textArr.map((el, idx) => {
        let clazz = 'card__setnence__word';

        if (el === mainWord) {
          clazz += ' main';
          if (isCorrectAnswer || isSkippedWord) {
            clazz += ' visible';
          }
        }
        return (
          <span className={clazz} key={idx.toString()}>
            {el}
          </span>
        );
      })}
    </div>
  );
};

CardMainSentence.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CardMainSentence;
