import axios from '../../../api/axios';

export const getWords = async (group, page) => {
  //group от 0 до 5, page по 30 страниц в каждой 20 солов
  const res = await axios.get(`/words?group=${group}&page=${page}`)
  return res;
};

export default { getWords };
