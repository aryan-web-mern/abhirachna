import axios from '../api/axios';
import { API_ROUTES } from '../constants/apiRoutes';



export const sendEstimate = async (data) => {
    try {
        const response = await axios.post(API_ROUTES.SEND_ESTIMATE, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEstimateQues = async () => {
    try {
        const response = await axios.get(API_ROUTES.GET_ESTIMATE_QUESTIONS);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getestimateBudget = async (id) => {
    try {
        const response = await axios.get(`${API_ROUTES.GET_ESTIMATE_BUDGET}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
