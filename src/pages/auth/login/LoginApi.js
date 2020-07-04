import axios from '../../../api/axios';
import { userLoginDataKey, userSettingsDataKey } from '../../../constants/constants';

export const signInUser = async (data) => {
  const res = await axios.post('/signin', data)
  return res;
};

export const logOut = () => {
  global.localStorage.removeItem(userLoginDataKey);
  global.localStorage.removeItem(userSettingsDataKey);
  global.location.reload();
}

export default { signInUser, logOut };
