import api from "../config/frontApi.config";
 

export const getSettings = async () => {
	try {
		const response = await api.get('/front/get-settings');
		return response;
	} catch (error) {
		return error;
	}
};