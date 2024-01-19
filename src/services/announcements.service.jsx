import api from "../config/frontApi.config";

export const listAnnouncementService = async (page = 1) => {
	try {
		//console.log(`/front/announcement/list-announcement?page=${page}`);
		const response = await api.get(`/front/announcement/list-announcement?page=${page}`);
		return response;
	} catch (error) {
		return error;
	}
};