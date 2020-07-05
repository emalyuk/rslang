import axios from 'axios';

import {
  userLoginDataKey,
  responseStatusNotFound,
  responseStatusInvalidToken,
} from '../../constants/constants';
import { initialSettings } from '../../constants/cardSettings';

const authOption = JSON.parse(localStorage.getItem(userLoginDataKey));
const { token, userId } = authOption;

const settingsUrl = `${process.env.REACT_APP_BASE_URL}/users/${userId}/settings`;
const settingsHeaders = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const getSettingsData = async () =>
  axios({
    url: settingsUrl,
    method: 'GET',
    headers: settingsHeaders,
  });

export const getSettings = async () => {
  let data;
  try {
    const response = await getSettingsData();
    data = {
      wordsPerDay: response.data.wordsPerDay,
      optional: response.data.optional,
    };
    return data;
  } catch (err) {
    // TODO: 401 Access token is missing or invalid
    if (err.response.status === responseStatusNotFound) {
      data = initialSettings;
    } else if (err.response.status === responseStatusInvalidToken) {
      data = initialSettings;
    }

    return data;
  }
};

export const putSettings = async (settings) =>
  axios({
    url: settingsUrl,
    method: 'PUT',
    headers: settingsHeaders,
    data: settings,
  });
