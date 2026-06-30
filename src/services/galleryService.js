import axios from "../api/axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const getAllGallery = async (userId, pageno, limit) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.GET_ALL_GALLERY}?page=${pageno}&limit=${limit}&userId=${userId ? userId : ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveGalleryImage = async (id) => {
  try {
    const response = await axios.post(API_ROUTES.SAVE_GALLERY_IMAGE + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllSavedGallery = async (pageNo, limit) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.GET_ALL_SAVED_GALLERY}?filter=saved&page=${pageNo}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGalleryById = async (id) => {
  try {
    const response = await axios.get(`${API_ROUTES.GET_GALLERY_BY_ID}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
