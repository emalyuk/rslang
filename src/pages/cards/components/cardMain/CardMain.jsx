import React from 'react';
import PropTypes from 'prop-types';

import CardImage from '../cardImage/CardImage';
import CardSentenceContainer from '../cardSentenceContainer/CardSentenceContainer';
import CardWordInfo from '../cardWordInfo/CardWordInfo';
import CardInput from '../cardInput/CardInput';

import './CardMain.scss';

const CardMain = ({ cardSettings, cardInfo }) => {
  const {
    image,
    audio,
    audioExample,
    audioMeaning,
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
    transcription,
    wordTranslate,
    word,
  } = cardInfo;

  console.log(cardInfo);

  const { wordsPerDay, optional } = cardSettings;
  const { extraInfoOnCard, mainInfoOnCard } = optional;
  const {
    isShowWordTranslation,
    isShowWordMeaning,
    isShowWordExample,
  } = mainInfoOnCard;
  const {
    isShowWordImage,
    isShowWordTranscription,
    isShowSentenceTranslation,
    isShowAnswerButton,
    isShowAnkiButtons,
  } = extraInfoOnCard;

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

          {isShowWordTranscription && <CardWordInfo text={transcription} />}
        </div>

        <CardInput
          word={word}
          // handleCheckAnswer={handleCheckAnswer}
          // setInputValue={setInputValue}
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
