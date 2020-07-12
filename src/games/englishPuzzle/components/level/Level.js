import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Level.scss';
import { Button } from '..';
import { createArrWithElems, setUniqueId } from '../../EnglishPuzzleUtils';
import { changePage, changeGroup } from '../../EnglishPuzzleReducer';

const Level = ({ hidePopup }) => {
  const { page, group } = useSelector((state) => state.englishPuzzle);
  const dispatch = useDispatch();
  const levelsNum = 6;
  const roundNums = 30;
  const levelsArr = createArrWithElems(levelsNum);
  const roundsArr = createArrWithElems(roundNums);

  const clickHandler = (e) => {
    e.stopPropagation()
  }

  const levelClickHandler = (roundNum) => {
    hidePopup();
    dispatch(changeGroup({ group: roundNum }))
  }

  const roundClickHandler = (levelNum) => {
    hidePopup();
    dispatch(changePage({ page: levelNum }))
  }

  return (
    <div
      className='level'
      onClick={clickHandler}
    >
      <Button
        className={'level__closeBtn'}
        clickHandler={() => hidePopup()}
      />
      <div className='level__header'>Уровень</div>
      <div className='level__btns-wrapper'>
        {levelsArr.map((level) => {
          return (
            <Button
              className={`level__btn ${(level === group) ? 'level__btn--active' : ''} `}
              text={level + 1}
              clickHandler={() => levelClickHandler(level)}
              key={setUniqueId()}
            />
          )
        })}
      </div>
      <div className='level__header'>Раунд</div>
      <div className='level__btns-wrapper'>
        {roundsArr.map((round) => {
          return (
            <Button
              className={`level__btn ${(round === page) ? 'level__btn--active' : ''} `}
              text={round + 1}
              clickHandler={() => roundClickHandler(round)}
              key={setUniqueId()}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Level;
