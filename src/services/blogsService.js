import axios from "../api/axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const getBlogsList = async (userId, page, limit) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.FETCH_BLOGS_LIST}?userId=${
        userId ? userId : ""
      }&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogDetails = async (id, userId) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.FETCH_BLOG_DETAILS + id}${
        userId ? `?userId=${userId}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const saveBlog = async (id) => {
  try {
    const response = await axios.post(API_ROUTES.SAVE_BLOG + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const likeBlog = async (id) => {
  try {
    const response = await axios.post(API_ROUTES.LIKE_BLOG + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchSavedBlogs = async (userId, page, limit) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.FETCH_SAVED_BLOGS}&userId=${encodeURIComponent(userId)}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
