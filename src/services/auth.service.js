import api from "../config/authApi.config";

export const getAuthUserService = async () => {
	try {
		const response = await api.get('/auth/get-auth-user');
		return response;
	} catch (error) {
		return error;
	}
};
export const getUserWalletAmount = async (data) => {
	try {
		const response = await api.get('/auth/profile/get-user-wallet-amount');
		return response;
	} catch (error) {
		return error;
	}

}

