import axios from 'axios';
import { API_URL } from '@env';
// console.log("hello");
 console.log(process.env.API_URL);
const api = axios.create({
	baseURL: process.env.API_URL + '/api',
	timeout: 15000,
});
export default api;
