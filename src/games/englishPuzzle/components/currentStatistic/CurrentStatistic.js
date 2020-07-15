import React, { useState } from 'react';
import './CurrentStatistic.scss';
import { Button } from '..';
import { Spinner } from '../../../../components';

const CurrentStatistic = ({ closeStatistic }) => {
  const [isLoad, setLoadState] = useState(true);
  const [isSpecificResult, setSpecificResultState] = useState(false);

  const loader = isLoad ? null : <Spinner />;
  const mainContent = (isLoad && !isSpecificResult) ? (
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
          <tr className='currentStatistic__row'>
            <td className='currentStatistic__cell'>28.06.2020, 16:56:00</td>
            <td className='currentStatistic__cell'>1.1</td>
            <td className='currentStatistic__cell'>
              <Button
                text='0/10'
                className='englishPuzzle__button'
              />
            </td>
          </tr>
          <tr className='currentStatistic__row'>
            <td className='currentStatistic__cell'>28.06.2020, 16:56:00</td>
            <td className='currentStatistic__cell'>1.1</td>
            <td className='currentStatistic__cell'>
              <Button
                text='0/10'
                className='englishPuzzle__button'
              />
            </td>
          </tr>
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
