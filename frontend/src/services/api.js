import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Altere para a URL da sua API backend se necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;