import axios from '../../../api/axios';

export const createUser = async (data) => {
  const res = await axios.post('/users', data);

  console.log(res.data);
};

export const signInUser = async (data) => {
  const res = await axios.post('/signin', data)

  console.log(res.data);
};
