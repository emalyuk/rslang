import React from 'react';

const LevelSelect = (props) => {
  const {onSelect, value} = props;

  return (
    <select onBlur={() => {}} onChange={onSelect} value={value} id='leavels'>
      <option value={0}>Leavel 0</option>
      <option value={1}>Leavel 1</option>
      <option value={2}>Leavel 2</option>
      <option value={3}>Leavel 3</option>
      <option value={4}>Leavel 4</option>
      <option value={5}>Leavel 5</option>
    </select>
  );
}

export default LevelSelect;
