import Axios from 'axios';

const fetchWords = async (page, group) => {
  const link = 'https://afternoon-falls-25894.herokuapp.com/words?';
  const response = await Axios.get(`${link}page=${page}&group=${group}`);
  const words = response.data.map((res) => {
    return {
      word: res.word,
      translate: res.wordTranslate,
      id: res.id,
      audio: res.audio,
      image: res.image,
    };
  });

  return words;
};

export default fetchWords;
