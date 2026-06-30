import axios from '../api/axios';
import { API_ROUTES } from '../constants/apiRoutes';


export const getJobsList = async (id) => {
	try {
		const response = await axios.get(API_ROUTES.FETCH_JOBS_List);
		return response.data;
	} catch (error) {
		throw error;
	}
};
export const getJobDetails = async (id) => {
	try {
		const response = await axios.get(API_ROUTES.FETCH_JOB_DETAIL + id);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const applyJob = async (data) => {
	try {
		const response = await axios.post(API_ROUTES.APPLY_JOB, data);
		return response.data;
	} catch (error) {
		throw error;
	}
}; 