import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/loading/Loading';
import { getWords } from './CardsSliceReducer';

import CardHeader from './components/cardHeader/CardHeader';
import CardMain from './components/cardMain/CardMain';
import CardFooter from './components/cardFooter/CardFooter';
import Button from '../../components/button/Button';

import { userSettingsDataKey } from '../../constants/constants';

import './Cards.scss';

const Cards = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.cards);
  const currentCardIndex = 0;

  const userSettings = JSON.parse(localStorage[userSettingsDataKey]);
  const { wordsPerDay, optional } = userSettings;
  const { newCardsPerDay } = optional;

  // TODO: Add to settings
  // MockData

  const page = 0;
  const group = 0;

  // End MockData

  useEffect(() => {
    dispatch(getWords(page, group));
    console.log('GET FIRST DATA');
  }, [dispatch, page, group]);

  useEffect(() => {
    console.log('DATA ARR UPDATE!');
  }, [data]);

  console.log(data);

  return (
    <div className='card__container container'>
      {data.length ? (
        <>
          <div className='card shadow'>
            <CardHeader />

            <CardMain
              cardSettings={userSettings}
              cardInfo={data[currentCardIndex]}
            />

            <CardFooter />
          </div>
          <div className='card__submit-container'>
            <Button
              type='submit'
              className='card__submit-button'
              disabled={false}
              onClick={() => console.log('next word!')}
            >
              n
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
