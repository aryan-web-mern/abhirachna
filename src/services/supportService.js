import axios from '../api/axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const sendSupportMsg = async (data) => {
	try {
		const response = await axios.post(API_ROUTES.SEND_SUPPORT_MSG, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const scheduleMeeting = async (data) => {
	try {
		const response = await axios.post(API_ROUTES.SCHEDULE_MEETING, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};