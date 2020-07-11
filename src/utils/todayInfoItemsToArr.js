const todayInfoItemsToArr = (
  bestSeries,
  countRightAnswers,
  countWrongAnswers,
  countSkipedWords,
) => {
  return [
    { label: 'Лучшая серия', count: bestSeries },
    { label: 'Верные ответы', count: countRightAnswers },
    { label: 'Неверные ответы', count: countWrongAnswers },
    { label: 'Пропущено слов', count: countSkipedWords },
  ];
};

export default todayInfoItemsToArr;
