import api from "../config/frontApi.config";

export const checkUserNameAvailibilityService = async (data) => {
	try {
		const response = await api.post('/front/check-username-availibility', data);
		return response;
	} catch (error) {
		return error;
	}
};

export const registrationService = async (data) => {
	try {
		const response = await api.post('/front/register', data);
		return response;
	} catch (error) {
		return error;
	}
};
