import axios from 'axios';
import { getAuthTokens, setAuthTokens } from './auth';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from '../store/redux/user-account-data.redux';


const api = axios.create({
	baseURL: process.env.API_URL + '/api',
	timeout: 15000,
});

const navigateToLogin = () => {
	const navigation = useNavigation();
	navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
  };
const resetStateData = ()=>{
	const dispatch = useDispatch();
	dispatch(userAccountDataActions.resetState());
}

api.interceptors.request.use(async (config) => {
	const {accessToken, refreshToken} = await getAuthTokens();
	config.headers = {
		Authorization: 'Bearer ' + accessToken,
		refreshtoken: refreshToken,
	};
	return config;
});

api.interceptors.response.use(async (res) => {
	const accesstoken = res?.data?.meta?.accesstoken || '';
	const refreshtoken = res?.data?.meta?.refreshtoken || '';

	 
	if (accesstoken && refreshtoken) {
		await setAuthTokens(accesstoken, refreshtoken);
	}
	if (res?.data?.status === 401) {
		resetStateData();
	}
	return res;
});
export default api;
