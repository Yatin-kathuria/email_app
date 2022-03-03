import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export const getAllEmails = () => api.get('/');

export const getEmailBody = (id) => api.get('/', { params: { id } });
