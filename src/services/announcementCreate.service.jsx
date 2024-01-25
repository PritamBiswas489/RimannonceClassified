import api from "../config/authApi.config";
export const createAnnouncementService = async (data) => {
	try {
		const response = await api.post(`/auth/announcement/create`,data);
		return response;
	} catch (error) {
		return error;
	}
};