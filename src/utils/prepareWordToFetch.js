const prepareWordToFetch = (diff, isRepeat = false) => {
  const date = (new Date(Date.now())).toLocaleDateString();
  return {
    difficulty: diff,
    optional: {
      date,
      isRepeat,
    },
  };
};

export { prepareWordToFetch };
