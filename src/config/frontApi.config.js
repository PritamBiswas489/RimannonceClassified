import axios from 'axios';
import { config } from '../../config';
const {API_URL} = config;
console.log(API_URL);
const api = axios.create({
	baseURL: API_URL + '/api',
	timeout: 15000,
});
export default api;
