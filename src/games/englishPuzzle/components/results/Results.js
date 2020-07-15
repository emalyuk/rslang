import React, { useState } from 'react';
import './Results.scss';
import { useSelector } from 'react-redux';
import { Result, CurrentStatistic } from '..';

const Results = ({ lvlSwitcher, resultStateSwitcher }) => {
  const {
    page, group, rows, data,
    imgData: {
      author, imageSrc, name, year,
    },
  } = useSelector((state) => state.englishPuzzle);
  const guessed = rows.filter((obj) => obj.isGuessed)
  const notGuessed = rows.filter((obj) => !obj.isGuessed)
  const [isStatistic, setStatisticState] = useState(false);
  const clickHandler = (e) => {
    e.stopPropagation();
  }

  const nextRound = () => {
    resultStateSwitcher();
    lvlSwitcher();
  }

  const result = isStatistic ? null : (
    <Result
      group={group}
      page={page}
      imageSrc={imageSrc}
      guessed={guessed}
      notGuessed={notGuessed}
      author={author}
      year={year}
      name={name}
      rows={rows}
      data={data}
      nextRound={nextRound}
      showStatistic={() => setStatisticState(true)}
    />
  );

  const statistic = isStatistic ? (
    <CurrentStatistic
      closeStatistic={() => setStatisticState(false)}
    />
  ) : null;

  return (
    <div
      className='results'
      onClick={clickHandler}
    >
      {result}
      {statistic}
    </div>
  )
}

export default Results;
