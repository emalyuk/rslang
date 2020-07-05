const arrayOfNumbers = (min, max) => {
  console.log(min, max);
  return [...Array(Number(max)).keys()].map((number) => number + Number(min));
};

export default arrayOfNumbers;
