import api from "../config/authApi.config";

export const getAuthUserService = async () => {
	try {
		const response = await api.get('/auth/get-auth-user');
		return response;
	} catch (error) {
		return error;
	}
};

