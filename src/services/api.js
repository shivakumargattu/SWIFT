import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE}/users`);
  return response.data;
};

export const getComments = async () => {
  const response = await axios.get(`${API_BASE}/comments`);
  return response.data;
};