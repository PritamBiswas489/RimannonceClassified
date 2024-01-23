import api from "../config/frontApi.config";

export const loginService = async (data) => {
	try {
		const response = await api.post('/front/login', data);
		return response;
	} catch (error) {
		return error;
	}
};
export const forgetPasswordService = async (email) => {
	try {
		const response = await api.get(`/front/send-forget-password-email?email=${email}`);
		return response;
	} catch (error) {
		return error;
	}
}