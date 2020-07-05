const arrayOfNumbers = (step, quanity) => {
  return [...Array(Number(quanity)).keys()].map(
    (number) => (number + 1) * step,
  );
};

export default arrayOfNumbers;
