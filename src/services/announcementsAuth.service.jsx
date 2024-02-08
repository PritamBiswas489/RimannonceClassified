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
export const deleteAnnouncement = async (id) =>{
	try {
		const response = await  api.get(`/auth/announcement/delete-listing?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}

}
export const closeAnnouncement =  async (id) =>{
	try {
		const response = await  api.get(`/auth/announcement/close-listing?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}


}

export const reportAnnouncement =  async (data) =>{
	try {
		const response = await  api.post(`/auth/announcement/report-listing`,data);
		return response;
	} catch (error) {
		return error;
	}


}
