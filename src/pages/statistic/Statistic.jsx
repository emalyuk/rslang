import React, { useState } from 'react';
import '../../../node_modules/chartist/dist/scss/chartist.scss';
import ChartistGraph from 'react-chartist';
import './Statistic.scss';

const options = {
  showArea: true,
  high: 40,
  low: 0,
  axisX: {
    labelInterpolationFnc: function (value, index) {
      return index % 2 === 0 ? value : null;
    }
  }
};

const Statistic = () => {
  const [data, setData] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [10, 1, 3, 6, 20, 0, 13, 25],
    ],
  });

  return (
    <div className='statistic-wrapper'>
      <div className='graph-wrapper'>
        <div className='blur' />
        <div className='inner-wrapper'>
          <h1>Savanna</h1>
          <ChartistGraph data={data} type='Line' options={options} />
        </div>
      </div>

      <div className='graph-wrapper'>
        <div className='blur' />
        <div className='inner-wrapper'>
          <h1>Leo-sprint</h1>
          <ChartistGraph data={data} type='Line' options={options} />
        </div>
      </div>

      <div className='graph-wrapper'>
        <div className='blur' />
        <div className='inner-wrapper'>
          <h1>Speak-it</h1>
          <ChartistGraph data={data} type='Line' options={options} />
        </div>
      </div>

      <div className='graph-wrapper'>
        <div className='blur' />
        <div className='inner-wrapper'>
          <h1>English-puzzle</h1>
          <ChartistGraph data={data} type='Line' options={options} />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
