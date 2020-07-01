const arrayOfNumbers = (min, max) => {
  return [...Array(Number(max)).keys()].map((number) => number + Number(min));
};

export default arrayOfNumbers;
