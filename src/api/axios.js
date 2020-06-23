import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://afternoon-falls-25894.herokuapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axios;
