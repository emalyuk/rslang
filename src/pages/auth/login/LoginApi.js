import axios from '../../../api/axios';
import {
  userLoginDataKey,
  userSettingsKey,
} from '../../../constants/constants';

export const signInUser = async (data) => {
  const res = await axios.post('/signin', data);
  return res;
};

export const logOut = () => {
  global.localStorage.removeItem(userLoginDataKey);
  global.localStorage.removeItem(userSettingsKey);
  global.location.reload();
};

export default { signInUser, logOut };
