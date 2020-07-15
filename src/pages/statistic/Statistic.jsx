import React, { useState, useEffect } from 'react';
import '../../../node_modules/chartist/dist/scss/chartist.scss';
import ChartistGraph from 'react-chartist';
import { getStats } from 'pages/home/HomeApi';
import { options } from './config';
import './Statistic.scss';

const defaultStat = { labels: [], series: [[]] };

const Statistic = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [savanna, setSavanna] = useState(defaultStat);
  const [speakit, setSpeakit] = useState(defaultStat);
  const [englishpuzzle, setEnglishpuzzle] = useState(defaultStat);
  const [leosprint, setLeosprint] = useState(defaultStat);

  const loadStatistics = async () => {
    const stats = await getStats();

    const newSavanna = { labels: [], series: [[]] };
    const newSpeakit = { labels: [], series: [[]] };
    const newLeosprint = { labels: [], series: [[]] };
    const newEnglishpuzzle = { labels: [], series: [[]] };

    if (stats.optional.savanna) {
      stats.optional.savanna.statistics.forEach((item) => {
        newSavanna.labels.push(item.date);
        newSavanna.series[0].push(item.right);
      });
    }

    if (stats.optional.speakit) {
      stats.optional.speakit.statistics.forEach((item) => {
        newSpeakit.labels.push(item.date);
        newSpeakit.series[0].push(item.right);
      });
    }

    if (stats.optional.leosprint) {
      stats.optional.leosprint.statistics.forEach((item) => {
        newLeosprint.labels.push(item.date);
        newLeosprint.series[0].push(item.right);
      });
    }

    if (stats.optional.englishpuzzle) {
      stats.optional.englishpuzzle.statistics.forEach((item) => {
        newEnglishpuzzle.labels.push(item.date);
        newEnglishpuzzle.series[0].push(item.right);
      });
    }

    setSavanna(newSavanna);
    setSpeakit(newSpeakit);
    setLeosprint(newLeosprint);
    setEnglishpuzzle(newEnglishpuzzle);

    setIsLoaded(true);
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  return (
    <div className='statistic-wrapper'>
      {isLoaded && !savanna.series[0].length && !speakit.series[0].length && !leosprint.series[0].length && !englishpuzzle.series[0].length && <h2>Статистика отсутствует</h2>}

      {!!savanna.series[0].length && (
        <div className='graph-wrapper'>
          <div className='blur' />
          <div className='inner-wrapper'>
            <h1>Savanna</h1>
            <ChartistGraph data={savanna} type='Line' options={options}/>
          </div>
        </div>
      )}

      {!!speakit.series[0].length && (
        <div className='graph-wrapper'>
          <div className='blur' />
          <div className='inner-wrapper'>
            <h1>Leo-sprint</h1>
            <ChartistGraph data={speakit} type='Line' options={options}/>
          </div>
        </div>
      )}

      {!!leosprint.series[0].length && (
        <div className='graph-wrapper'>
          <div className='blur' />
          <div className='inner-wrapper'>
            <h1>Leo-sprint</h1>
            <ChartistGraph data={leosprint} type='Line' options={options} />
          </div>
        </div>
      )}

      {!!englishpuzzle.series[0].length && (
        <div className='graph-wrapper'>
          <div className='blur' />
          <div className='inner-wrapper'>
            <h1>Leo-sprint</h1>
            <ChartistGraph data={englishpuzzle} type='Line' options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistic;
