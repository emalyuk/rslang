import axios from 'axios';

// examples api calls

// example api GET
export const getHomeData = async () => {
  return axios.get('https://api-football-v1.p.rapidapi.com/v2/predictions/157462')
}

export const postHomeData = async (reqBody) => axios.post('home', reqBody);
