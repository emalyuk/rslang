const getIntegerPercent = (total, part) => {
  return ((part * 100) / total).toFixed(0);
};

export { getIntegerPercent };
