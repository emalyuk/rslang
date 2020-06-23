import axios from '../../../api/axios';

const signInUser = async (data) => {
  const res = await axios.post('/signin', data)

  console.log(res.data);
};

export default signInUser;
