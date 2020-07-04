const initialSettings = {
  wordsPerDay: 50,
  optional: {
    mainInfoOnCard: {
      isShowWordTranslation: true,
      isShowWordMeaning: true,
      isShowWordExample: true,
    },
    extraInfoOnCard: {
      isShowWordTranscription: true,
      isShowWordImage: true,
      isShowSentenceTranslation: true,
      isShowAnswerButton: true,
      isShowAnkiButtons: true,
    },
    newCardsPerDay: 50,
  },
};

const labelsForSwitchers = {
  isShowWordTranslation: 'Перевод слова',
  isShowWordMeaning: 'Предложение с объяснением значения слова',
  isShowWordExample: 'Предложение с примером использования слова',
  isShowWordTranscription: 'Транскрипция слова',
  isShowWordImage: 'Картинка-ассоциация',
  isShowSentenceTranslation: 'Перевод предложений',
  isShowAnswerButton: 'Кнопка показать ответ',
  isShowAnkiButtons: 'Кнопки оценки сложности слов',
};

const settingsLabelName = {
  settings: 'Настройки',
  mainInfoOnCard: {
    en: 'mainInfoOnCard',
    ru: 'Основные (одна из опций обязательна)',
  },
  extraInfoOnCard: {
    en: 'extraInfoOnCard',
    ru: 'Дополнительные',
  },
  maxCardsPerDay: {
    en: 'maxCardsPerDay',
    ru: 'Максимум в день',
  },
  newCardsPerDay: {
    en: 'newCardsPerDay',
    ru: 'Новых в день',
  },
  cardsNumber: 'Количество карточек',
};

export { initialSettings, settingsLabelName, labelsForSwitchers };
