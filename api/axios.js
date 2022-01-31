export const API_URL = `https://api.jikan.moe/v4`;
import axios from 'axios';

// season upcoming for the sliders
export const getSeasonUpcomingAnime = async () => {
  const response = await axios.get(`${API_URL}/seasons/upcoming`);
  return response.data.data;
};
//top anime first carousel
export const getTopAnime = async () => {
  const response = await axios.get(`${API_URL}/top/anime`);
  return response.data.data;
};

export const getSeasonSummerAnime = async () => {
  const response = await axios.get(`${API_URL}/seasons/2022/summer`);
  return response.data.data;
};
export const getSeasonSpringAnime = async () => {
  const response = await axios.get(`${API_URL}/seasons/2022/spring`);
  return response.data.data;
};

export const getSeasonsWinterAnime = async () => {
  const response = await axios.get(`${API_URL}/seasons/2022/winter`);
  return response.data.data;
};

export const searchAnimeByName = async query => {
  const response = await axios.get(`${API_URL}/anime?q=${query}`);
  return response.data.data;
};
