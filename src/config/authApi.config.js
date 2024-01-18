import axios from 'axios';
import { getAuthTokens, setAuthTokens } from '@/libraries/auth.js';

const [accessToken, refreshToken] = getAuthTokens();

// console.log('bb :>> ', accessToken);
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api',
	timeout: 15000,
	// headers: {
	// 	Authorization: 'Bearer ' + accessToken,
	// 	refreshtoken: refreshToken,
	// },
});

api.interceptors.request.use((config) => {
	// Add configurations here
	const [accessToken, refreshToken] = getAuthTokens();
	config.headers = {
		Authorization: 'Bearer ' + accessToken,
		refreshtoken: refreshToken,
	};
	return config;
});

api.interceptors.response.use((res) => {
	// Add configurations here
	// console.log('res', res);
	const accesstoken = res?.data?.meta?.accesstoken || '';
	const refreshtoken = res?.data?.meta?.refreshtoken || '';

	// console.log('accesstoken inceptor', accesstoken);
	if (accesstoken && refreshtoken) {
		setAuthTokens(accesstoken, refreshtoken);
	}
	if (res?.data?.status === 401) {
		window.location.href = '/';
		// console.log('accesstoken :>> ', accesstoken);
	}
	return res;
});
export default api;
