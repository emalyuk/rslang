import axios from '../../../api/axios';

const signInUser = async (data) => {
  const res = await axios.post('/signin', data)

  return res;
};

export default signInUser;
