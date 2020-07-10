import axios from 'axios';
import {
  baseWordsUrl,
  groupPath,
  wordsPerExampleSentencePath,
  wordsPerPagePath,
  userLoginDataKey,
  responseStatusNotFound,
  responseStatusInvalidToken,
  usersPath,
  wordsPath,
} from 'constants/constants';

// const authOption = JSON.parse(localStorage.getItem(userLoginDataKey));
// const { token, userId } = authOption;

const getWordsConfig = {
  baseURL: `${process.env.REACT_APP_BASE_URL}${baseWordsUrl}`,
  headers: {
    Accept: 'application/json',
  },
};

export const getWordsData = async (group) => {
  return axios.get(
    `${groupPath}${group}${wordsPerExampleSentencePath}${wordsPerPagePath}`,
    getWordsConfig,
  );
};
