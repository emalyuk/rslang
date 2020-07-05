import axios from 'axios';

import { baseWordsUrl } from 'constants/constants';

export const getWordsData = async (page, group) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}${baseWordsUrl}page=${page}&group=${group}`,
  );
};
