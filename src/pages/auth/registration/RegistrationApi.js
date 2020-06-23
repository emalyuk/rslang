import axios from '../../../api/axios';

const createUser = async (data) => {
  const res = await axios.post('/users', data);

  console.log(res.data);
};

export default createUser;
