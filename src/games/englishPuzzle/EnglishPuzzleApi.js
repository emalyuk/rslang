import axios from 'axios';
import { transform } from './EnglishPuzzleUtils';
import { puzzleMocks } from '../../constants'

export const getData = async (width, height, page, group) => {
  const response = await axios.get(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);
  let { data } = response;
  if (data.length < 10) {
    const filtered = puzzleMocks.filter((obj, index) => obj.word !== data[index].word)
    data = [...data, ...filtered];
  }
  const formatted = transform(data, width, height);

  return formatted;
};
