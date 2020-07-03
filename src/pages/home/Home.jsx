import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeInfo } from './HomeSliceReducer';

import HomeStatus from './components/homeStatus/HomeStatus';
import CardSettings from './components/cardSettings/CardSettings';

import './Home.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state) => state.home);

  // MockData
  const wordsCountLearned = 555;
  const totalCardsPerDay = 20;

  useEffect(() => {
    dispatch(getHomeInfo());
  }, []);

  return (
    <div className='home'>
      <div className='home-container container'>
        <HomeStatus
          wordsCountLearned={wordsCountLearned}
          totalCardsPerDay={totalCardsPerDay}
        />
        <CardSettings />
      </div>
    </div>
  );
};

export default Home;
