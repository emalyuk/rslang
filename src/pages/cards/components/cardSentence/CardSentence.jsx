/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import './CardSentence.scss';

const CardMainSentence = ({ text }) => {
  const regExp = /<.*?>(.+)<.*?>/;
  const textArr = text.split(' ');
  const wordArr = text.match(regExp);
  const regExpGroup1 = 1;
  const currentWord = wordArr[regExpGroup1];

  let classes = 'card__main__word';
  // if (!isCorrectAnswer) {
  //   classes += ' hidden';
  // }

  return (
    <div className='card__main__sentence'>
      {textArr.map((el, idx) => {
        const regex = /<.*?>/;
        if (regex.test(el)) {
          const arr = el.match(regExp);
          const tag = arr[0];
          const char = el.replace(tag, '');
          return (
            <span key={`${el}${idx}`} className='card__main__word-container'>
              <span className={classes}>{currentWord}</span>
              {char && (
                <span key={`${el}${idx}`} className='main-word__sign'>
                  {char}
                </span>
              )}
            </span>
          );
        } else {
          return (
            <span
              key={`${el}${idx}`}
              className='card__main__other-word'
              onClick={(e) => console.log(e.target.textContent)}
            >
              {el}
            </span>
          );
        }
      })}
    </div>
  );
};

CardMainSentence.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CardMainSentence;
