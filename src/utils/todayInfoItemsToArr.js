const todayInfoItemsToArr = ({
  bestSeries,
  countRightAnswer,
  countWrongAnswer,
  countSkipedWords,
}) => {
  return [
    { label: 'Лучшая серия', count: bestSeries },
    { label: 'Верные ответы', count: countRightAnswer },
    { label: 'Неверные ответы', count: countWrongAnswer },
    { label: 'Пропущено слов', count: countSkipedWords },
  ];
};

export default todayInfoItemsToArr;
