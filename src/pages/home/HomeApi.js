import axios from 'axios';

import {
  userLoginDataKey,
  responseStatusNotFound,
  responseStatusInvalidToken,
  usersPath,
  statsPath,
  settingsPath,
} from 'constants/constants';

import { getFormattedData } from 'utils/getFormattedData';

import { initialSettings } from 'constants/cardSettings';
import { initialStats } from 'constants/stats';

const authOption = JSON.parse(localStorage.getItem(userLoginDataKey)) || 'temp';
const { token, userId } = authOption;

const usersUrl = `${process.env.REACT_APP_BASE_URL}${usersPath}${userId}`;

const config = {
  baseURL: usersUrl,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('JWT') !== null) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('JWT')).token}`;
    config.baseURL = `${process.env.REACT_APP_BASE_URL}${usersPath}${JSON.parse(localStorage.getItem('JWT')).userId}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const getData = async (path, initialData) => {
  let data;
  try {
    const response = await axios.get(path, config);
    return getFormattedData(response.data);
  } catch (err) {
    // TODO: 401 Access token is missing or invalid
    if (err.response.status === responseStatusNotFound) {
      data = initialData;
    } else if (err.response.status === responseStatusInvalidToken) {
      data = initialData;
    }

    return data;
  }
};

export const getSettings = async () => getData(settingsPath, initialSettings);

export const getStats = async () => getData(statsPath, initialStats);

export const putSettings = async (settings) => {
  axios.put(settingsPath, JSON.stringify(settings), config);
};

export const putStats = async (stats) => {
  axios.put(statsPath, JSON.stringify(stats), config);
};

export const postWord = async (idWord, data) => {
  axios.post(`/words/${idWord}`, data, config);
};

export const getUserWords = async () => axios.get('/words', config);

export const deleteWord = async (idWord) => axios.delete(`/words/${idWord}`, config);

export const getUserWordsWithFilter = async (filter) => {
  const testfULTER = JSON.stringify({
    $or: [
      { ['userWord.difficulty']: `${filter}` },
    ],
  });

  return axios.get(`/aggregatedWords?filter=${testfULTER}`, config);
};

export const putWord = async (idWord, data) => {
  return axios.put(`/words/${idWord}`, data, config);
};
