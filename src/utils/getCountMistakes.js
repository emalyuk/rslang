export const getCountMistakes = (arr1, arr2) => {
  let count = 0;
  arr1.forEach((el, index) => {
    if (el !== arr2[index]) {
      count += 1;
    }
  });
  return count;
};
