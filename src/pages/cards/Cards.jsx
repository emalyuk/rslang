import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/loading/Loading';
import {
  userStatsKey,
  userSettingsKey,
  wordsInGroup,
} from 'constants/constants';
import { getWords, resetData } from './CardsSliceReducer';
import { getUserWords } from './CardsApi';

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
  const { countDeletedWords, countHardWords } = userStats.optional.cardStats;

  const numberStartCard = learnedWords + countDeletedWords + countHardWords;

  let group;

  if (learnedWords <= wordsInGroup) {
    group = 0;
  }

  useEffect(() => {
    dispatch(getWords(numberStartCard, group, wordsPerDay));
    getUserWords();
    return () => dispatch(resetData());
  }, [dispatch, numberStartCard, group, wordsPerDay]);

  useEffect(() => {}, [data]);

  return (
    <div className='card__container container'>
      {data.length ? (
        <>
          <div className='card shadow'>
            <CardHeader
              settings={cardExtraInfo}
              stats={userStats}
              wordId={data[currentCardIndex].id}
            />

            <CardMain
              cardSettings={userSettings}
              cardInfo={data[currentCardIndex]}
              stats={userStats}
            />

            <CardFooter
              cardMainInfo={cardMainInfo}
              data={data[currentCardIndex]}
              stats={userStats}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Cards;
