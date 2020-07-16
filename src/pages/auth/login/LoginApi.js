import axios from '../../../api/axios';
import {
  userLoginDataKey,
  userSettingsKey,
  userStatsKey,
} from '../../../constants/constants';

export const signInUser = async (data) => {
  const res = await axios.post('/signin', data);
  return res;
};

export const logOut = () => {
  global.localStorage.removeItem(userLoginDataKey);
  global.localStorage.removeItem(userSettingsKey);
  global.localStorage.removeItem(userStatsKey);
  global.location.reload();
};

export default { signInUser, logOut };
