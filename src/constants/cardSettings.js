const initialSettings = {
  wordsPerDay: 50,
  optional: {
    cardMainInfo: {
      isShowWordTranslation: true,
      isShowWordMeaning: true,
      isShowWordExample: true,
    },
    cardExtraInfo: {
      isShowWordTranscription: true,
      isShowWordImage: true,
      isShowSentenceTranslation: true,
      isShowDeleteButton: true,
      isShowHardButton: true,
      isShowAnswerButton: true,
      isShowAnkiButtons: true,
    },
    isOnlyNewWords: true,
    newWordsPerDay: 50,
  },
};

const labelsForSwitchers = {
  isShowWordTranslation: 'Перевод слова',
  isShowWordMeaning: 'Предложение с объяснением значения слова',
  isShowWordExample: 'Предложение с примером использования слова',
  isShowWordTranscription: 'Транскрипция слова',
  isShowWordImage: 'Картинка-ассоциация',
  isShowSentenceTranslation: 'Перевод предложений',
  isShowDeleteButton: 'Кнопка удалить слово',
  isShowHardButton: 'Кнопка добавить к сложным словам',
  isShowAnswerButton: 'Кнопка показать ответ',
  isShowAnkiButtons: 'Кнопки оценки сложности слов',
  isOnlyNewWords: 'Только новые слова',
};

const settingsLabelName = {
  settings: 'Настройки',
  cardMainInfo: {
    en: 'cardMainInfo',
    ru: 'Основные (одна из опций обязательна)',
  },
  cardExtraInfo: {
    en: 'cardExtraInfo',
    ru: 'Дополнительные',
  },
  maxWordsPerDay: {
    en: 'maxWordsPerDay',
    ru: 'Максимум в день',
  },
  newWordsPerDay: {
    en: 'newWordsPerDay',
    ru: 'Новых в день',
  },
  cardsNumber: 'Количество карточек',
};

export { initialSettings, settingsLabelName, labelsForSwitchers };
