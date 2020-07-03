import axios from 'axios';

import { userLoginDataKey } from '../../constants/constants';

const authOption = JSON.parse(localStorage.getItem(userLoginDataKey))
const { token, userId } = authOption;
const settingsUrl = `${process.env.REACT_APP_BASE_URL}/users/${userId}/settings`;

const homeService = axios.create({
  baseURL: settingsUrl,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const getSettingsData = async () => homeService.get();

export const putSettingsData = async (data) => axios({
  url: settingsUrl,
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
  data,
});
