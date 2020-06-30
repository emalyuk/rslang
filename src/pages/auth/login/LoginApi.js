import axios from '../../../api/axios';
import { userLoginDataKey } from '../../../constants/constants';

export const signInUser = async (data) => {
  const res = await axios.post('/signin', data)
  return res;
};

export const logOut = () => {
  global.localStorage.removeItem(userLoginDataKey);
  global.location.reload();
}

export default { signInUser, logOut };
