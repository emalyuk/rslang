export function getRandom (arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function isCurrentTranslateCorrect (wordsObject, currentWord) {
  if (wordsObject.length) {
    const findWord = wordsObject.find((item) => {
      return item.word === currentWord.enWord;
    });

    if (findWord) {
      return findWord.wordTranslate === currentWord.ruWord;
    }
  }
};

export default { getRandom, isCurrentTranslateCorrect };
