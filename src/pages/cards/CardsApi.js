import axios from 'axios';
import {
  baseWordsUrl,
  groupPath,
  wordsPerExampleSentencePath,
  wordsPerPagePath,
  userLoginDataKey,
  usersPath,
  wordsPath,
  wordsPathEnding,
} from 'constants/constants';

const authOption = JSON.parse(localStorage.getItem(userLoginDataKey)) || 'temp';
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

export const getWordsData = async (group) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}${baseWordsUrl}${groupPath}${group}${wordsPerExampleSentencePath}${wordsPerPagePath}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  return response;
};

export const getUserWords = async () => {
  console.log('user words')
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
};
