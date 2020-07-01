const initialSettings = {
  wordsPerDay: 50,
  optional: {
    mainInfoOnCard: [
      { label: 'Перевод слова', option: 'isShowWordTranslation', isChecked: true },
      { label: 'Предложение с объяснением значения слова', option: 'isShowWordMeaning', isChecked: true },
      { label: 'Предложение с примером использования слова', option: 'isShowWordExample', isChecked: true },
    ],
    extraInfoOnCard: [
      { label: 'Транскрипция слова', option: 'isShowWordTranscription', isChecked: true },
      { label: 'Картинка-ассоциация', option: 'isShowWordImage', isChecked: true },
      { label: 'Перевод предложений', option: 'isShowSentenceTranslation', isChecked: true },
      { label: 'Кнопка показать ответ', option: 'isShowAnswerButton', isChecked: true },
      { label: 'Кнопки оценки сложности слов', option: 'isShowAnkiButtons', isChecked: true },
    ],
    newCardsPerDay: 50,
  },
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

export { initialSettings, settingsLabelName };
