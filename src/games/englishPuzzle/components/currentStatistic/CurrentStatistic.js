import React, { useState, useEffect } from 'react';
import './CurrentStatistic.scss';
import { Button } from '..';
import { Spinner } from '../../../../components';
import { getLocalStorageStat } from '../../EnglishPuzzleUtils';

const CurrentStatistic = ({ closeStatistic }) => {
  const [isLoad, setLoadState] = useState(false);
  const [statistics, setStatistic] = useState([])

  useEffect(() => {
    const stat = getLocalStorageStat();
    setStatistic(stat)
    setLoadState(true);
  }, []);

  const loader = isLoad ? null : <Spinner />;
  const mainContent = isLoad ? (
    <>
      <Button
        text='Назад'
        clickHandler={closeStatistic}
        className='englishPuzzle__button'
      />
      <table className='currentStatistic-table'>
        <tbody className='currentStatistic__body'>
          <tr className='currentStatistic__header'>
            <th className='currentStatistic__header-item'>Дата</th>
            <th className='currentStatistic__header-item'>Уровень</th>
            <th className='currentStatistic__header-item'>Результат</th>
          </tr>
          {statistics.map((obj) => {
            const {
              date, round, guessed, notGuessed,
            } = obj;
            return (
              <>
                <tr className='currentStatistic__row'>
                  <td className='currentStatistic__cell'>{date}</td>
                  <td className='currentStatistic__cell'>{round}</td>
                  <td className='currentStatistic__cell'>
                    <Button
                      text={`${guessed}/${notGuessed}`}
                      className='englishPuzzle__button'
                    />
                  </td>
                </tr>
              </>
            )
          })}

        </tbody>
      </table>
    </>
  ) : null;

  return (
    <div className='currentStatistic'>
      {mainContent}
      {loader}
    </div>
  )
}

export default CurrentStatistic;
