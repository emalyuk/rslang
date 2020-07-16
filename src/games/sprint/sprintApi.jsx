import axios from '../../api/axios';

export const getWords = async (group, page) => {
  const res = await axios.get(`/words?group=${group}&page=${page}`)
  return res;
};

export default { getWords };
