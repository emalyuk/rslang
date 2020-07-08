import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import CardImage from '../cardImage/CardImage';
import CardSentenceContainer from '../cardSentenceContainer/CardSentenceContainer';
import CardWordInfo from '../cardWordInfo/CardWordInfo';
import CardInput from '../cardInput/CardInput';

import './CardMain.scss';

const CardMain = ({ cardSettings, cardInfo }) => {
  const dispatch = useDispatch();
  const { currentCardAction } = useSelector((state) => state.cards);
  const { isAnswerReceived, isCorrectAnswer } = currentCardAction;

  const {
    image,
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
    transcription,
    wordTranslate,
  } = cardInfo;

  const { optional } = cardSettings;
  const { cardExtraInfo, cardMainInfo } = optional;
  const {
    isShowWordTranslation,
    isShowWordMeaning,
    isShowWordExample,
  } = cardMainInfo;
  const {
    isShowWordImage,
    isShowWordTranscription,
    isShowSentenceTranslation,
    isShowAnswerButton,
    isShowAnkiButtons,
  } = cardExtraInfo;

  return (
    <div className='card__main'>
      {isShowWordImage && <CardImage imgUrlEnding={image} />}
      <div className='card__main__text-container'>
        {isShowWordMeaning && (
          <CardSentenceContainer
            text={textMeaning}
            textTranslation={textMeaningTranslate}
            isShowSentenceTranslation={isShowSentenceTranslation}
          />
        )}

        {isShowWordExample && (
          <CardSentenceContainer
            text={textExample}
            textTranslation={textExampleTranslate}
            isShowSentenceTranslation={isShowSentenceTranslation}
          />
        )}

        <div className='card__main__word-info'>
          {isShowWordTranslation && <CardWordInfo text={wordTranslate} />}
          {!isShowWordTranslation && isCorrectAnswer && (
            <CardWordInfo text={wordTranslate} />
          )}

          {isShowWordTranscription && <CardWordInfo text={transcription} />}
        </div>

        <CardInput
          cardInfo={cardInfo}
          isShowWordMeaning={isShowWordMeaning}
          isShowWordExample={isShowWordExample}
        />
      </div>
    </div>
  );
};

CardMain.propTypes = {
  cardInfo: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  cardSettings: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  ).isRequired,
};

export default CardMain;
