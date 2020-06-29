const primaryCardSettings = [
  { label: 'Перевод слова', option: 'wordTranslation' },
  {
    label: 'Предложение с объяснением значения слова',
    option: 'wordMeaningSentence',
  },
  {
    label: 'Предложение с примером использования слова',
    option: 'wordExampleSentence',
  },
];

const secondaryCardSettings = [
  { label: 'Транскрипция слова', option: 'wordTranscription' },
  { label: 'Картинка-ассоциация', option: 'pictureAssociation' },
  {
    label: 'Перевод предложений',
    option: 'wordTranslationSentece',
  },
  {
    label: 'Кнопка показать ответ',
    option: 'showSkipButton',
  },
  {
    label: 'Конпка оценки сложности слов',
    option: 'wordDifficultRate',
  },
];

export { primaryCardSettings, secondaryCardSettings };
