// src/api/authService.js

import axios from 'axios';

const login = async (notaryId, password) => {
  try {
    const response = await axios.post('/api/auth/login', { notaryId, password });
    return response.data;
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message);
    return null;
  }
};

const register = async (notaryId, name, password) => {
  try {
    const response = await axios.post('/api/auth/register', { notaryId, name, password });
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error.response?.data || error.message);
    return null;
  }
};

export default { login, register };
