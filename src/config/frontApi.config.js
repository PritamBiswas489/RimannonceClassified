import axios from 'axios';
import { API_URL } from '@env';
console.log(API_URL);
const api = axios.create({
	baseURL: API_URL + '/api',
	timeout: 15000,
});
export default api;
