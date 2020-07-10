import axios from 'axios';
import { transform } from './EnglishPuzzleUtils';

export const getData = async (width, height) => {
  //temp query
  const response = await axios.get(`https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0`);
  const { data } = response;
  const formatted = transform(data, width, height);
  return formatted;
};
