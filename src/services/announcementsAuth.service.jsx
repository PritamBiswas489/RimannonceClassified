import api from "../config/authApi.config";
 
export const myAnnouncementListing = async (page = 1) => {
	try {
		const response = await  api.get(`/auth/announcement/my-listing?page=${page}`);
		return response;
	} catch (error) {
		return error;
	}
};
export const myFavoriteAnnouncementListing = async (page = 1) => {
	try {
		const response = await  api.get(`/auth/announcement/my-favorite-listing?page=${page}`);
		return response;
	} catch (error) {
		return error;
	}
}; 
