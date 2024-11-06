import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('/user/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');
