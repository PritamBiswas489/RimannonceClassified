import api from "../config/authApi.config";
import frontApi from "../config/frontAuthApi.config";

export const profileDetailService = async () => {
	try {
		const response = await api.get('/auth/profile/detail');
		return response;
	} catch (error) {
		return error;
	}
};
export const editProfileService = async (data) => {
	try {
		const response = await api.post('/auth/profile/edit', data);
		return response;
	} catch (error) {
		return error;
	}
};
export const uploadProfilePic = async (data) => {
	try {
		const response = await frontApi.post('/auth/upload-avatar', data);
		return response;
	} catch (error) {
		return error;
	}
};
export const deleteProfile = async () => {
	try {
		const response = await api.get('/auth/profile/delete-account');
		return response;
	} catch (error) {
		return error;
	}

}
export const contactUsProcess = async (data) => {
	try {
		const response = await api.post('/auth/profile/contact-us',data);
		return response;
	} catch (error) {
		return error;
	}
}



