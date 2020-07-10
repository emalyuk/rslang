import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/loading/Loading';
import Button from 'components/button/Button';
import {
  userStatsKey,
  userSettingsKey,
  wordsInGroup,
} from 'constants/constants';
import { getWords, resetData } from './CardsSliceReducer';

import CardHeader from './components/cardHeader/CardHeader';
import CardMain from './components/cardMain/CardMain';
import CardFooter from './components/cardFooter/CardFooter';

import './Cards.scss';

const Cards = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.cards);
  const currentCardIndex = 0;

  const userStats = JSON.parse(localStorage[userStatsKey]);
  const userSettings = JSON.parse(localStorage[userSettingsKey]);
  const { cardExtraInfo, cardMainInfo } = userSettings.optional;
  const { wordsPerDay } = userSettings;
  const { learnedWords } = userStats;
  let group;

  if (learnedWords <= wordsInGroup) {
    group = 0;
  }

  useEffect(() => {
    dispatch(getWords(learnedWords, group, wordsPerDay));
    console.log('GET FIRST DATA');
    return () => dispatch(resetData());
  }, [dispatch, learnedWords, group, wordsPerDay]);

  useEffect(() => {
    console.log('DATA ARR UPDATE!');
    console.log(data);
  }, [data]);

  return (
    <div className='card__container container'>
      {data.length ? (
        <>
          <div className='card shadow'>
            <CardHeader settings={cardExtraInfo} />

            <CardMain
              cardSettings={userSettings}
              cardInfo={data[currentCardIndex]}
            />

            <CardFooter
              cardMainInfo={cardMainInfo}
              data={data[currentCardIndex]}
            />
          </div>
          <div className='card__submit-container'>
            <Button
              type='submit'
              className='card__submit-button'
              disabled={false}
              onClick={() => {
                console.log('NEXT');
              }}
            >
              &#8594;
            </Button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Cards;
