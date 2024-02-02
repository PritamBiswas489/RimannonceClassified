import frontApi from "../config/frontAuthApi.config";
export const createAnnouncementService = async (data) => {
	try {
		const response = await frontApi.post(`/auth/announcement/create`,data);
		return response;
	} catch (error) {
		return error;
	}
};
export const updateAnnouncementService = async (data) => {
	try {
		const response = await frontApi.post(`/auth/announcement/update`,data);
		return response;
	} catch (error) {
		return error;
	}
};