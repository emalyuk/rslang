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

const authOption = JSON.parse(localStorage.getItem(userLoginDataKey));
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
