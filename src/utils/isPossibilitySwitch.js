const isPossibilitySwitch = (oldMainSettings, option) => {
  const newMainSettings = Object.entries(oldMainSettings).map((el) => {
    return el[0] === option ? el[1] = !el[1] : el[1];
  });
  return !newMainSettings.every((el) => el === false);
};

export default isPossibilitySwitch;
