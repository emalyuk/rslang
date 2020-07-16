import { sentenceRegExp, sentenceRegExpWithChar } from 'constants/constants';

const getFormattedSentence = (text) => {
  const wordArr = text.match(sentenceRegExpWithChar);
  const regExpGroup1 = 1;
  const regExpGroup2 = 2;
  const mainWord = wordArr[regExpGroup1];
  const punctuationMark = wordArr[regExpGroup2].trim();

  let formattedText = text.replace(sentenceRegExp, mainWord);

  if (punctuationMark) {
    formattedText = formattedText.replace(
      punctuationMark,
      ` ${punctuationMark}`,
    );
  }

  const textArr = formattedText.split(' ');

  return {
    textArr,
    mainWord,
  };
};

export default getFormattedSentence;
