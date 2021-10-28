import axios from 'axios';

const {REACT_APP_API_URL} = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL || "http://127.0.0.1:8000/api",
});

export default api;