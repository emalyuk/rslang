import axios from '../../../api/axios';

const createUser = async (data) => {
  const res = await axios.post('/users', data);

  return res;
};

export default createUser;
