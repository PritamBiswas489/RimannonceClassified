import api from "../config/frontApi.config";
 
export const listAnnouncementService = async (page = 1) => {
	try {
		const response = await  api.get(`/front/announcement/list-announcement?page=${page}`);
		return response;
	} catch (error) {
		return error;
	}
};
export const getListGlobal = async (page = 1,category = '',search = '',locationids = []) => {
	const url = `/front/announcement/list-get-global?page=${page}&cat=${category}&search=${search}&locationids=${JSON.stringify(locationids)}`;
	console.log(url)
	try {
		const response = await  api.get(url);
		return response;
	} catch (error) {
		return error;
	}

}
export const getListPremium = async (page = 1,category = '',search = '',locationids = []) => {
	const url = `/front/announcement/list-get-premium?page=${page}&cat=${category}&search=${search}&locationids=${JSON.stringify(locationids)}`;
	console.log(url)
	try {
		const response = await  api.get(url);
		return response;
	} catch (error) {
		return error;
	}

}
export const getListGlobalRand = async (page = 1,category = '',search = '') => {
	 
	try {
		const response = await  api.get(`/front/announcement/list-get-global-rand?page=${page}&cat=${category}&search=${search}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const getListGetGpApartment = async (page = 1 ,search = '') => {
	try {
		const response = await  api.get(`/front/announcement/list-get-gp-apartment?page=${page}&search=${search}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const getListGetGpDelivery = async (page = 1 ,search = '') => {
	//console.log(`/front/announcement/list-get-gp-delivery?page=${page}&search=${search}`)
	try {
		const response = await  api.get(`/front/announcement/list-get-gp-delivery?page=${page}&search=${search}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const getListGetGpCar = async (page = 1 ,search = '') => {
	try {
		const response = await  api.get(`/front/announcement/list-get-gp-car?page=${page}&search=${search}`);
		return response;
	} catch (error) {
		return error;
	}

}




export const getAnnouncementService = async (id) => {
	try {
		const response = await  api.get(`/front/announcement/get-announcement?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}
};

export const getIsFavourite = async (id,user_id) => {
	try {
		const response = await  api.get(`/front/announcement/check-announcement-favourite?id=${id}&user_id=${user_id}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const addAnnouncementUnderFav = async (id,user_id)=>{
	try {
		const response = await  api.get(`/front/announcement/add-announcement-favourite?id=${id}&user_id=${user_id}`);
		return response;
	} catch (error) {
		return error;
	}

}

