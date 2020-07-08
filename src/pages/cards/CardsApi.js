import axios from 'axios';
import {
  baseWordsUrl,
  userLoginDataKey,
  responseStatusNotFound,
  responseStatusInvalidToken,
  usersPath,
  wordsPath,
} from 'constants/constants';

// const authOption = JSON.parse(localStorage.getItem(userLoginDataKey));
// const { token, userId } = authOption;

// const usersUrl = `${process.env.REACT_APP_BASE_URL}${usersPath}${userId}`;

// const config = {
//   baseURL: usersUrl,
//   withCredentials: true,
//   headers: {
//     Accept: 'application/json',
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   },
// };

export const getWordsData = async (page, group) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}${baseWordsUrl}page=${page}&group=${group}`,
  );
};
