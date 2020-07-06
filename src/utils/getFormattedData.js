const getFormattedData = (data) => {
  const formattedData = data;
  delete formattedData.id;
  return data;
};

export { getFormattedData };
