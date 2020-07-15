/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './Result.scss';
import { setUniqueId } from '../../EnglishPuzzleUtils'
import { Button } from '..';

const Result = (props) => {
  const {
    group, page, imageSrc, guessed, notGuessed,
    author, year, name, rows, nextRound, showStatistic,
    data, index,
  } = props;

  const audio = new Audio();

  const continueClickHandler = () => {
    nextRound();
  }

  const playSound = (ind) => {
    const { audioExample } = data[ind];
    audio.src = `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${audioExample}`;
    audio.play();
  }

  return (
    <>
      <div className='result__content'>
        <h2 className='result__header'>{`Результаты для ${group + 1}:${page + 1}`}</h2>
        <img src={imageSrc} alt={name} className='result__img' />
        <div className='result__img-desc'>
          {`${name} ${author} (${year})`}
        </div>
        <div className='result__count'>
          <div className='result__count-know'>
            Знаю
        <span>{guessed.length}</span>
          </div>
          <div className='result__count-dontKnow'>
            Не знаю
        <span>{notGuessed.length}</span>
          </div>
        </div>
        <ul className='result__list'>
          {rows.map((row, ind) => {
            const cssCls = `result__item ${row.isGuessed ? 'result__item--know' : 'result__item--dont'}`;
            return (
              <li
                className={cssCls}
                key={setUniqueId()}
                onClick={() => playSound(ind)}
              >
                {row.wordsArr.join(' ')}
              </li>
            )
          })}
        </ul>

      </div>

      <div className='result__btns'>
        <Button
          className='englishPuzzle__button result__btn result__btn--first'
          text='continue'
          clickHandler={continueClickHandler}
        />
        <Button
          className='englishPuzzle__button result__btn'
          text='statistic'
          clickHandler={() => showStatistic()}
        />
      </div>
    </>
  )
}

export default Result;
