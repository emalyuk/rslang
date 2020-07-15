import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/button/Button';
import LevelSelect from './LevelSelect';

const RepeatGameControllers = (props) => {
  const {
    currectAnswer, unCurrectAnswer, allAnswer, onClick, onSelect, leavels,
  } = props;
  // const currectAnswer = ;
  // const unCurrectAnswer = ;
  // const allAnswer = ;

  return (
    <div className='start-game-controller'>
      <div className='repeat-game-menu'>
        <Button
          disabled={false}
          onClick={onClick}
          className='button-to-start'
          type='button'
        >
          Повторить
        </Button>

        <LevelSelect onSelect={onSelect} value={leavels} />
      </div>

      <div className='statistics'>
        <p>{`Всего: ${allAnswer}`}</p>
        <p>{`Правильные: ${currectAnswer}`}</p>
        <p>{`Не верно: ${unCurrectAnswer}`}</p>
        <p>
          {`Верных ответов:
            ${
                allAnswer !== 0
                  ? Math.floor((currectAnswer / allAnswer) * 100)
                  : 0
            }%`}
        </p>
      </div>
    </div>
  );
};

export default RepeatGameControllers;

RepeatGameControllers.propTypes = {
  currectAnswer: PropTypes.number.isRequired,
  unCurrectAnswer: PropTypes.number.isRequired,
  allAnswer: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  leavels: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}
