import axios from '../api/axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const fetchTestimonialsData = async (page, limit) => {
    try {
        const response = await axios.get(`${API_ROUTES.FETCH_TESTIMONIALS}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postTestimonial = async (data) => {
    try {
        const response = await axios.post(API_ROUTES.CREATE_TESTIMONIAL, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};