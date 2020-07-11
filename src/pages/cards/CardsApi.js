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
  wordsPathEnding,
} from 'constants/constants';

const authOption = JSON.parse(localStorage.getItem(userLoginDataKey));
const { token, userId } = authOption;

const usersUrl = `${process.env.REACT_APP_BASE_URL}${usersPath}${userId}`;

const getWordsConfig = {
  baseURL: `${process.env.REACT_APP_BASE_URL}${baseWordsUrl}`,
  headers: {
    Accept: 'application/json',
  },
};

const getUserWordsConfig = {
  baseURL: usersUrl,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

const putUserWordConfig = {
  baseURL: usersUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

export const getWordsData = async (group) => {
  return axios.get(
    `${groupPath}${group}${wordsPerExampleSentencePath}${wordsPerPagePath}`,
    getWordsConfig,
  );
};

export const getUserWords = async () => {
  const response = await axios.get(wordsPathEnding, getUserWordsConfig);

  console.log(response.data, 'getUserWords');
};

export const createUserWord = async (wordId, word) => {
  const rawResponse = await fetch(`${usersUrl}${wordsPath}${wordId}`, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const content = await rawResponse.json();

  console.log(content);
};
