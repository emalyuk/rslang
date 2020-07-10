import React from 'react';
import PropTypes from 'prop-types';

import { getCountMistakes } from 'utils/getCountMistakes';

import './CardHintAnswer.scss';

const CardHintAnswer = ({
  wordLength,
  wordArr,
  inputValueArr,
  handleOnChangeAnswer,
}) => {
  const countMistakes = getCountMistakes(wordArr, inputValueArr);

  return wordArr.map((letter, index) => {
    let clazz = 'card__result__letter';

    if (letter !== inputValueArr[index]) {
      clazz += countMistakes < wordLength / 2 ? ' wrong' : ' wrongest';
    }

    return (
      <span
        className={clazz}
        key={index.toString()}
        onClick={handleOnChangeAnswer}
      >
        {letter}
      </span>
    );
  });
};

CardHintAnswer.propTypes = {
  wordLength: PropTypes.number.isRequired,
  wordArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  inputValueArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnChangeAnswer: PropTypes.func.isRequired,
};

export default CardHintAnswer;
