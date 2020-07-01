const initialSettings = {
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
    { label: 'Конпка оценки сложности слов', option: 'isShowAnkiButtons', isChecked: true },
  ],
  cardsCount: {
    maxCardsPerDay: 50,
    newCardsPerDay: 50,
  },
};

export { initialSettings };
